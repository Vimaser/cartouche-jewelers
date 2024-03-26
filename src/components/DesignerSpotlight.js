import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedDesigners } from './DesignerService';
import './css/DesignerSpotlight.css'; 

const DesignerSpotlight = () => {
    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        // Fetch featured designers
        const fetchDesigners = async () => {
            const fetchedDesigners = await getFeaturedDesigners(); // Implement this function in your service
            setDesigners(fetchedDesigners);
        };

        fetchDesigners();
    }, []);

    return (
        <div className="designer-spotlight-container">
            <h2>Designer Spotlight</h2>
            <div className="designers-grid">
                {designers.map(designer => (
                    <div key={designer.name} className="designer-card">
                        <img src={designer.featuredImageUrl} alt={designer.name} />
                        <div className="designer-info">
                            <h3>{designer.name}</h3>
                            <p>{designer.bio}</p>
                            <Link to={`/designers/${designer.name}`} className="btn-view-designer">Learn More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesignerSpotlight;
