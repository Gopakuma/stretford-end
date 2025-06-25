import { Consumer, Kafka, Producer } from "kafkajs";
import { WebSocketServer } from 'ws';

class KafkaBroker {
    private kafka: Kafka;
    public producer: Producer;
    private consumer: Consumer;
    private wss: WebSocketServer | null = null; // Proper WebSocketServer type

    constructor() {
        this.kafka = new Kafka({
            brokers: ['localhost:9092'],
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'chat-group' });
    }

    // Set WebSocket server instance after creation
    setWebSocketServer(wss: WebSocketServer) {
        this.wss = wss;
    }

    async startConsumer() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                if (message.value) {
                    const msg = JSON.parse(message.value.toString());
                    console.log('Kafka received:', msg);

                    // Broadcast to WebSocket clients
                    this.broadcastMessage(msg);
                }
            },
        });
    }

    broadcastMessage(msg: any) {
        if (!this.wss) {
            console.warn('WebSocket server not set for broadcasting');
            return;
        }

        console.log(`Broadcasting to ${this.wss.clients.size} clients`);

        this.wss.clients.forEach(client => {
            if (client.readyState === 1) { // 1 = OPEN
                client.send(JSON.stringify(msg));
            }
        });
    }

    async sendMessage(sender: string, content: string, group: string = 'community') {
        try {
            await this.producer.send({
                topic: 'chat-messages',
                messages: [{
                    value: JSON.stringify({
                        sender,
                        content,
                        group,
                        timestamp: new Date().toISOString()
                    })
                }]
            });
        } catch (error) {
            console.error('Failed to send message to Kafka:', error);
            throw error;
        }
    }

    async connect() {
        await this.producer.connect();
        await this.startConsumer();
    }

    async disconnect() {
        await this.producer.disconnect();
        await this.consumer.disconnect();
    }
}

export default KafkaBroker;