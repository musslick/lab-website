// src/data/team.ts

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    color: string;
    projects?: string[];
}

export const teamMembers: TeamMember[] = [
    {
        name: "Sarah Johnson",
        role: "Principal Investigator",
        bio: "Dr. Johnson specializes in neural network mapping with a background in computational neuroscience and machine learning.",
        imageUrl: "/assets/team/johnson.jpg",
        color: "#FF5F6D",
        projects: ["neural-mapping", "memory-enhancement"]
    },
    {
        name: "Michael Chen",
        role: "Research Scientist",
        bio: "Dr. Chen focuses on brain-computer interfaces and has extensive experience in signal processing and neural engineering.",
        imageUrl: "/assets/team/chen.jpg",
        color: "#36D1DC",
        projects: ["neural-mapping", "brain-computer"]
    },
    {
        name: "Robert Smith",
        role: "Computational Neuroscientist",
        bio: "Dr. Smith works on cognitive modeling and AI, bridging the gap between artificial intelligence and human cognition.",
        imageUrl: "/assets/team/smith.jpg",
        color: "#4E65FF",
        projects: ["cognitive-ai", "consciousness-study"]
    },
    {
        name: "Emily Wong",
        role: "Data Scientist",
        bio: "Dr. Wong specializes in analyzing complex neural data patterns and developing algorithms for brain-computer interfaces.",
        imageUrl: "/assets/team/wong.jpg",
        color: "#92EFFD",
        projects: ["cognitive-ai", "brain-computer"]
    },
    {
        name: "David Patel",
        role: "Cognitive Psychologist",
        bio: "Dr. Patel studies human memory and consciousness, with particular interest in enhancement techniques and theoretical models.",
        imageUrl: "/assets/team/patel.jpg",
        color: "#A88BEB",
        projects: ["memory-enhancement", "consciousness-study"]
    }
];