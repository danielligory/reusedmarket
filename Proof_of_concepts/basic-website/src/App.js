import './App.css';

function App() {
  return (
    <div className="app">
        <header className="app-header">
          RHUL Blog Post
        <nav>
          <ul className ="header-list">
            <li><a href='/'>Home</a></li>
            <li><a href='/features'>Features</a></li>
            <li><a href='/galleries'>Galleries</a></li>
            <li><a href='/contact'>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className = "blog-post">
          <h2> Blog Post Title </h2>
          <p> Published by John Wick on Janurary 15, 2023 </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            feugiat massa. Praesent sed bibendum odio. Aenean facilisis quam sit
            amet diam scelerisque, ac hendrerit lorem pharetra.
          </p>
          <a href='/post/1'> Read More </a>
        </section>

        <section ClassName = "blog-post">
          <h2>Another Blog Post</h2>
          <p> Published by Rick Roll on Feburary 02, 2023 </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            feugiat massa. Praesent sed bibendum odio. Aenean facilisis quam sit
            amet diam scelerisque, ac hendrerit lorem pharetra.
          </p>
          <a href='/post/2'> Read More </a>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 RHUL Blog </p>
        <div className = "social-icons">
          <a href='https://www.facebook.com/royalholloway/' className = 'social-icons'>Facebook</a>
          <a href='https://twitter.com/RoyalHolloway/' className = 'social-icons'>Twitter</a>
          <a href='https://www.instagram.com/royalholloway/' className = 'social-icons'>Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
