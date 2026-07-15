import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const foodImages = [
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    alt: 'Fresh vegetables'
  },
  {
    url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
    alt: 'Healthy meal bowl'
  },
  {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    alt: 'Fruit platter'
  }
];

function Home() {
  const user = JSON.parse(localStorage.getItem('naUser'));

  return (
    <div className="home-page">
      <Navbar />

      <div className="home-hero">
        <h1>Welcome to Nutrition Assistant 🍎</h1>
        <p>
          Your best partner to better health today! Whether you're looking to maintain a balanced diet,
          support growth and development, or manage your weight — our assistant is ready to provide
          you with expert guidance tailored to your lifestyle.
        </p>
        <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '0' }}>
          Click on the button below and answer a few questions about your age, height, and weight
          to get a customized diet plan.
        </p>
      </div>

      <div className="home-images">
        {foodImages.map((img, i) => (
          <div className="home-img-card" key={i}>
            <img src={img.url} alt={img.alt} />
          </div>
        ))}
      </div>

      <div className="home-cta">
        <Link to="/new-plan">
          <button id="get-diet-plan-btn" className="btn-primary" style={{ padding: '14px 40px', fontSize: '1rem' }}>
            Get Diet Plan
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
