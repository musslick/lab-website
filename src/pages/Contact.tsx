import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: string | null;
  }>({
    submitted: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: 'Please fill in all required fields.'
      });
      return;
    }

    // In a real application, you would send the form data to your backend
    // For this example, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: null
      });
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="contact-page">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>Interested in working with us? Get in touch with our <Link to="/team"><span style={{ color: '#00AAFF' }}>team</span></Link>.</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <p>Our lab entertains <b>collaborations</b> with researchers in both academia and industry. We are particularly interested to learn from and work with researchers focused in AI for science and automated scientific discovery, irrespective of the application domain.</p>
            <p></p>
            <p>For <b>press inquiries</b>, please contact <a href="mailto:office-spa@uni-osnabrueck.de"><span style={{ color: '#00AAFF' }}>Julia Reuter</span></a> or <a href="mailto:sebastian.musslick@uos.de"><span style={{ color: '#00AAFF' }}>Sebastian Musslick</span></a>. </p>
          </div>

          {/*
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className="success-message">
                <h3>Thank you for reaching out!</h3>
                <p>We have received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {formStatus.error && (
                  <div className="error-message">{formStatus.error}</div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">Send Message</button>
              </form>
            )}
          </div>
          */}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
