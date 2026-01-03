const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const About = require('../models/About');
const Career = require('../models/Career');
const Project = require('../models/Project');
const Service = require('../models/Service');
const connectDB = require('../config/db');

dotenv.config({ path: __dirname + '/../.env' });

connectDB();

const seedData = async () => {
    try {
        // --- Users ---
        const userExists = await User.findOne({ role: 'SUPER_ADMIN' });
        if (!userExists) {
            await User.create({
                username: 'ayush',
                password: 'ayush@2004',
                role: 'SUPER_ADMIN',
                permissions: []
            });
            console.log('Super Admin Created (ayush)');
        }

        // --- About Us ---
        await About.deleteMany({});
        await About.create({
            heading: "Reliability at Every Layer of Scale",
            overview: "OFT TECH stands at the intersection of complex enterprise requirements and cutting-edge technical execution. We don't just solve problems; we engineer sustainable competitive advantages.",
            stats: [
                { value: "150+", label: "Architects" },
                { value: "10yr+", label: "Excellence" }
            ],
            values: [
                {
                    title: "Strategic Trust",
                    description: "Building long-term governance and security into every digital initiative.",
                    icon: "Shield"
                },
                {
                    title: "Value Engineering",
                    description: "Optimizing technology investments for maximum operational ROI.",
                    icon: "Zap"
                },
                {
                    title: "Global Collaboration",
                    description: "Seamlessly integrating expert talent with internal enterprise teams.",
                    icon: "Users"
                },
                {
                    title: "Absolute Stability",
                    description: "Architecting for zero-downtime and massive horizontal scalability.",
                    icon: "Globe"
                }
            ]
        });
        console.log('About Data Seeded');

        // --- Careers ---
        await Career.deleteMany({});
        await Career.create([
            { title: "Lead Systems Architect", location: "Singapore / Hybrid", type: "Full-time", description: "Lead architecture...", requirements: ["Java", "AWS"] },
            { title: "Senior Cloud Security Engineer", location: "London / Remote", type: "Full-time", description: "Secure cloud...", requirements: ["Cybersecurity"] },
            { title: "Principal Backend Engineer (Java)", location: "San Francisco / Remote", type: "Full-time", description: "Backend dev...", requirements: ["Spring Boot"] }
        ]);
        console.log('Careers Seeded');

        // --- Projects ---
        await Project.deleteMany({});
        await Project.create([
            {
                title: "Global Financial Infrastructure Modernization",
                industry: "Financial Services",
                problem: "A major European bank faced critical downtime during peak trading hours due to legacy core banking sync latencies.",
                solution: "Implemented an event-driven microservices architecture on Azure, leveraging Kafka for real-time data consistency and Kubernetes for auto-scaling.",
                outcome: "99.995% uptime achievement with a 45% reduction in cross-border transaction processing time.",
                color: "border-blue-500/20"
            },
            {
                title: "AI-Driven Supply Chain Synchronization",
                industry: "Logistics & Retail",
                problem: "A Fortune 500 retailer suffered from 12% revenue leakage due to inventory fragmentation across its global warehouse network.",
                solution: "Developed an IoT-integrated predictive analytics engine to synchronize real-time shelf data with upstream production cycles.",
                outcome: "Inventory accuracy improved to 99.1%, resulting in a predicted $40M annual recovery in lost sales.",
                color: "border-emerald-500/20"
            }
        ]);
        console.log('Projects Seeded');

        // --- Services ---
        await Service.deleteMany({});
        await Service.create([
            {
                title: "Resilient Systems",
                description: "Building architectures that endure through environmental and technical shifts with absolute stability.",
                icon: "Globe",
                tag: "Verification: Active",
                order: 1
            },
            {
                title: "Scalable Growth",
                description: "Horizontal expansion strategies that align with modern business velocity and infrastructure load.",
                icon: "Cloud",
                tag: "Auto-Migration",
                order: 2
            },
            {
                title: "Secure Foundations",
                description: "Deep-rooted security protocols that protect your core enterprise assets using zero-trust models.",
                icon: "Settings",
                tag: "Identity Secured",
                order: 3
            }
        ]);
        console.log('Services Seeded');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
