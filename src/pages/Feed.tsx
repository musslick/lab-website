import React from 'react';

interface FeedItem {
    id: number;
    title: string;
    date: string;
    content: string;
}

const feedData: FeedItem[] = [
    {
        id: 1,
        title: "New Research Publication",
        date: "2023-08-15",
        content: "Our team has published groundbreaking research in neural network analysis."
    },
    {
        id: 2,
        title: "Upcoming Conference",
        date: "2023-09-01",
        content: "Join us at the International Conference on Brain Research next month."
    },
    {
        id: 3,
        title: "Lab Update",
        date: "2023-08-10",
        content: "We've acquired new equipment for advanced brain imaging studies."
    }
];

const Feed: React.FC = () => {
    return (
        <div className="feed-container">
            <h1>Latest Updates</h1>
            <div className="feed-items">
                {feedData.map((item) => (
                    <div key={item.id} className="feed-item">
                        <h2>{item.title}</h2>
                        <p className="date">{item.date}</p>
                        <p className="content">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
