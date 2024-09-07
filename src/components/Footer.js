export default function Footer() {
    return (
      <footer>
        <div className="subscribe">
          <h3>Be the First to Know</h3>
          <p>Sign up for updates from mettà muse.</p>
          <input type="email" placeholder="Enter your e-mail..." />
          <button>Subscribe</button>
        </div>
        <div className="links">
          <div className="column">
            <h4>mettà muse</h4>
            <a href="#">About Us</a>
            <a href="#">Stories</a>
            <a href="#">Artisans</a>
            <a href="#">Boutiques</a>
            <a href="#">Contact Us</a>
            <a href="#">EU Compliances Docs</a>
          </div>
          <div className="column">
            <h4>Quick Links</h4>
            <a href="#">Orders & Shipping</a>
            <a href="#">Join/Login as a Seller</a>
            <a href="#">Payment & Pricing</a>
            <a href="#">Return & Refunds</a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
          <div className="column">
            <h4>Contact Us</h4>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>
            <h4>Currency</h4>
            <p>$ USD</p>
          </div>
        </div>
        <div className="social-media">
          <a href="#"><img src="/linkedin-icon.png" alt="LinkedIn" /></a>
          <a href="#"><img src="/instagram-icon.png" alt="Instagram" /></a>
          <a href="#"><img src="/facebook-icon.png" alt="Facebook" /></a>
        </div>
        <div className="payment-methods">
          <img src="/payment-methods.png" alt="Payment Methods" />
        </div>
        <p>&copy; 2023 mettà muse. All rights reserved.</p>
       
      </footer>
    );
  }
  