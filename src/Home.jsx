import './index.css';
import { apps } from '../data.js';
import { useNavigate } from 'react-router-dom';

function toggleClearButton(textarea) {
  const clearButton = document.querySelector('.clearbtn');
  if (textarea.value.trim() !== '') {
    clearButton.style.display = 'inline';
  } else {
    clearButton.style.display = 'none';
  }
}

function clearSearchBar() {
  const textarea = document.querySelector('.searchbar-text');
  textarea.value = '';
  toggleClearButton(textarea);
  textarea.focus();
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    event.target.form.submit();
  }
}

function Home() {
  const navigate = useNavigate(); // <-- hook called inside component

  return (
    <div background="Resources/Wallpapers/light-mode.jpg">
      <div className="navbar">
        <div className="navbar-title">VHome</div>
      </div>

      <center>
        <div className="searchbar">
          <form action="https://www.google.com/search" autoComplete="on" method="GET" target="_blank">
            <div className="searchbar-container">
              <textarea
                className="searchbar-text"
                autoComplete="on"
                autoFocus
                name="q"
                placeholder="Search or ask AI for anything..."
                onKeyDown={handleKeyDown}
                onInput={e => toggleClearButton(e.target)}
              ></textarea>
              <div
                className="clearbtn"
                onClick={clearSearchBar}
                style={{ display: 'none' }}
              >
                ✖
              </div>
            </div>
            <div className="searchbar-buttons">
              <button type="submit" className="googlebtn"></button>
              <button
                type="button"
                className="bingbtn"
                onClick={() =>
                  window.open(
                    'https://www.bing.com/search?q=' + document.querySelector('.searchbar-text').value,
                    '_blank'
                  )
                }
              ></button>
              <button
                type="button"
                className="gptbtn"
                onClick={() =>
                  window.open(
                    'https://chat.openai.com/?q=' + document.querySelector('.searchbar-text').value,
                    '_blank'
                  )
                }
              ></button>

              {/* Disabled buttons */}

              <button
                type="button"
                className="perplexitybtn"
                onClick={() =>
                  window.open(
                    'https://www.perplexity.ai/search?q=' + document.querySelector('.searchbar-text').value,
                    '_blank'
                  )
                }
              ></button>
            </div>
          </form>
        </div>
      </center>

      <br />

      <div className="dashboardcontainer">
        <div className="column1">
          <div className="quicklinks">
            <div className="header">
              <div className="icon"></div>
              <div className="quicklinks-header-text">Quick Links</div>
            </div>
            <div className="quicklinkscontainer">
              <div
                className="quicklink-item"
                onClick={() => window.open('https://vtopcc.vit.ac.in/')}
              >
                <center>
                  <div className="quicklink-item text">VTOPcc</div>
                </center>
              </div>
              <div
                className="quicklink-item"
                onClick={() => navigate('/calendar', { replace: true })}
              >
                <div className="quicklink-item text">Calendars</div>
                <div
                  className="quicklink-item icon"
                  style={{ backgroundImage: "url('Resources/Icons/calendar.jpg')" }}
                ></div>
              </div>
              <div
                className="quicklink-item"
                onClick={() => (window.location = 'nptel.html')}
              >
                <center>
                  <div className="quicklink-item text">NPTEL Links</div>
                </center>
              </div>
              <div
                className="quicklink-item"
                onClick={() => navigate('/examschedule', { replace: true })}
              >
                <center>
                  <div className="quicklink-item text">Exam Schedule</div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="column2">
        <div className="spotlight">
          <div className="header">
            <div className="icon"></div>
            <div className="spotlight-header-text">Spotlight</div>
          </div>

          <div className="spotlight-item">
            <div className="spotlight-item text">
              Hostel Room allotment details is now available on VTop {'>'} Hostels {'>'} Mess Selection 2025-2026.
            </div>
          </div>

          <div className="spotlight-item">
            <div className="spotlight-item text">
              Mess selection is now available on VTop {'>'} Hostels {'>'} Mess Selection 2025-2026.
            </div>
          </div>
        </div>
      </div>

      <div className="allappscontainer">
        {apps.map(({ id, name, description, url }) => (
          <div key={id} className={`card ${id}`} onClick={() => window.open(url)}>
            <div className="card-content">
              <div className="title">{name}</div>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>

      <br /><br /><br /><br /><br />
      <div className="footbar">
        <br />
        <br />
        <div className="footbar-text">
          © All rights reserved
          <br />
          <br />
          vhome.co.in
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
