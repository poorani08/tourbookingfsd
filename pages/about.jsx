import React from 'react';
import './about.css';
import Newsletter from '../shared/Newsletter'


const About = () => {
  return (
    <div className="about-container">
      <main className="main-content">
        <section className="about-us">
          <h2>About Us</h2>
          <p>Welcome to Tour Booking, your number one source for all things travel. We're dedicated to giving you the very best of tour packages, with a focus on dependability, customer service, and uniqueness.</p>
          <p>Founded in 2024 by xyz, Tour Booking has come a long way from its beginnings in a home office. When John first started out, his passion for eco-friendly and adventure travel drove him to quit his day job, and gave him the impetus to turn hard work and inspiration into a booming online tour booking platform. We now serve customers all over the world, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the travel industry.</p>
          <p>We offer a diverse range of tours to meet every traveler's needs:</p>
          <ul>
            <li><strong>Adventure Tours:</strong> Thrilling experiences for the adrenaline junkie, from mountain climbing to white-water rafting.</li>
            <li><strong>Eco-Friendly Tours:</strong> Sustainable travel options that minimize your carbon footprint and support local communities.</li>
            <li><strong>Cultural Tours:</strong> Immersive journeys into the history, traditions, and lifestyles of diverse cultures.</li>
            <li><strong>Luxury Tours:</strong> Premium experiences with high-end amenities, personalized services, and exclusive access to top destinations.</li>
            <li><strong>Family Tours:</strong> Fun and engaging tours designed for families, ensuring a memorable experience for all ages.</li>
          </ul>
          <p>Our mission is to make travel planning as easy and enjoyable as possible. Whether you're looking for adventure, relaxation, or a bit of both, we have the perfect tour for you. We pride ourselves on offering exceptional customer service and unique travel experiences that you'll cherish for a lifetime.</p>
          <p>We hope you enjoy our tours as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
          <p>Sincerely,<br />xyz, Founder</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Tour Booking. All rights reserved.</p>
      </footer>
      <Newsletter/>
   
      
     
    </div>
  );
};

export default About;
