(function () {
  const STORAGE_KEY = 'mirai_age_verified';
  const MIN_AGE = 21;

  // Already verified?
  if (localStorage.getItem(STORAGE_KEY) === 'true') return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'age-gate';
  overlay.innerHTML = `
    <div class="age-gate-backdrop">
      <div class="age-gate-modal">
        <div class="age-gate-logo">
          <div class="age-gate-dot"></div>
          <div>
            <div class="age-gate-brand">MIRAI LABS</div>
            <div class="age-gate-jp">未来</div>
          </div>
        </div>

        <h2 class="age-gate-title">Age Verification Required</h2>
        <p class="age-gate-text">
          This website contains research chemical products intended strictly for laboratory use.
          You must be at least <strong>${MIN_AGE} years of age</strong> to enter.
        </p>

        <p class="age-gate-disclaimer">
          By entering you confirm that you are ${MIN_AGE}+ and that you understand all products are
          <strong>For Research Use Only</strong> — not for human or animal consumption.
        </p>

        <div class="age-gate-actions">
          <button id="age-gate-enter" class="age-gate-btn-primary">
            I am ${MIN_AGE} or older — Enter
          </button>
          <button id="age-gate-exit" class="age-gate-btn-secondary">
            I am under ${MIN_AGE} — Exit
          </button>
        </div>

        <p class="age-gate-footer">
          Science for a Brighter Tomorrow.
        </p>
      </div>
    </div>
  `;

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #age-gate {
      position: fixed;
      inset: 0;
      z-index: 99999;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .age-gate-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .age-gate-modal {
      background: #ffffff;
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      animation: ageGateIn 0.3s ease-out;
    }
    @keyframes ageGateIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .age-gate-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1.75rem;
    }
    .age-gate-dot {
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: #dc2626;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .age-gate-dot::after {
      content: '';
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 9999px;
      background: white;
    }
    .age-gate-brand {
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: -0.01em;
      line-height: 1.1;
      text-align: left;
    }
    .age-gate-jp {
      font-size: 0.65rem;
      color: #dc2626;
      letter-spacing: 0.15em;
      text-align: left;
    }
    .age-gate-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.75rem;
      letter-spacing: -0.02em;
    }
    .age-gate-text {
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.55;
      margin: 0 0 1rem;
    }
    .age-gate-disclaimer {
      font-size: 0.8rem;
      color: #64748b;
      line-height: 1.5;
      margin: 0 0 1.75rem;
      padding: 0.85rem 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.75rem;
      text-align: left;
    }
    .age-gate-actions {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .age-gate-btn-primary {
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 9999px;
      padding: 0.85rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .age-gate-btn-primary:hover {
      background: #b91c1c;
    }
    .age-gate-btn-secondary {
      background: transparent;
      color: #64748b;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      padding: 0.75rem 1.5rem;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    .age-gate-btn-secondary:hover {
      background: #f8fafc;
      color: #475569;
    }
    .age-gate-footer {
      margin: 1.5rem 0 0;
      font-size: 0.7rem;
      color: #94a3b8;
    }
    body.age-gate-active {
      overflow: hidden;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
  document.body.classList.add('age-gate-active');

  // Enter
  document.getElementById('age-gate-enter').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'true');
    overlay.remove();
    document.body.classList.remove('age-gate-active');
  });

  // Exit
  document.getElementById('age-gate-exit').addEventListener('click', function () {
    window.location.href = 'https://www.google.com';
  });
})();
