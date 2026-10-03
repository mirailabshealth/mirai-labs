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

// Shared account navigation. Runs independently of the age-gate early return.
// Existing public pages load this common entry point; no age checks are removed.
(async function initMiraiAccountMenu() {
  if (document.getElementById('mirai-account-bar')) return;
  const header = document.querySelector('body > nav, body > header');
  if (!header) return;
  const portalURL = new URL('./portal.html', location.href);
  const css = document.createElement('style');
  css.textContent = `
    #mirai-account-bar{position:sticky;top:var(--mirai-nav-offset,64px);z-index:49;background:#fff;border-bottom:1px solid #e2e7ee;font:13px/1.5 Inter,system-ui,sans-serif;color:#172033}
    #mirai-account-bar .mirai-account-inner{max-width:1280px;margin:auto;min-height:52px;padding:8px 22px;display:flex;align-items:center;justify-content:space-between;gap:12px}
    #mirai-account-bar a{color:#172033;text-decoration:none;font-weight:600}
    #mirai-account-bar .mirai-account-actions{display:flex;align-items:center;gap:16px}
    #mirai-account-bar details{position:relative}
    #mirai-account-bar summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:8px;font-weight:650;padding:7px 10px;border-radius:8px;background:#f3f5f8}
    #mirai-account-bar summary::-webkit-details-marker{display:none}
    #mirai-account-bar summary::after{content:'⌄';font-size:15px}
    #mirai-account-bar .mirai-account-dropdown{position:absolute;right:0;top:calc(100% + 10px);width:min(300px,calc(100vw - 32px));padding:12px;background:#fff;border:1px solid #e2e7ee;border-radius:14px;box-shadow:0 15px 40px #14203925}
    #mirai-account-bar .mirai-account-dropdown a{display:block;padding:10px;border-radius:7px}
    #mirai-account-bar .mirai-account-dropdown a:hover{background:#f3f5f8}
    #mirai-account-bar .mirai-account-email{font-size:12px;color:#627086;overflow-wrap:anywhere;padding:5px 10px 12px;border-bottom:1px solid #e2e7ee;margin:0 0 5px}
    #mirai-account-bar button{font:600 13px/1.5 Inter,system-ui,sans-serif;cursor:pointer;background:none;border:0;color:#b91c1c;padding:8px 0;border-radius:4px}
    #mirai-account-bar button:disabled{opacity:.5;cursor:wait}
    #mirai-account-bar [hidden]{display:none!important}
    #mirai-account-bar :focus-visible{outline:3px solid #e9939c;outline-offset:3px}
    #mirai-account-status{margin:0;padding:0 22px 10px;color:#b91c1c;font-size:12px}
    #mirai-account-status:empty{display:none}
    @media(max-width:600px){#mirai-account-bar .mirai-account-inner{padding:8px 16px;gap:8px}#mirai-account-bar .mirai-account-actions{gap:12px}}
  `;
  document.head.append(css);
  const bar = document.createElement('nav');
  bar.id = 'mirai-account-bar';
  bar.setAttribute('aria-label', 'Account navigation');
  bar.innerHTML = `<div class="mirai-account-inner"><a data-home href="./portal.html">My portal</a><div class="mirai-account-actions"><a data-signin href="./portal.html">Sign in</a><details><summary>Account menu</summary><div class="mirai-account-dropdown"><p class="mirai-account-email">Checking account…</p><a href="./guide.html">Research guide</a><a data-client href="./portal.html?view=client" hidden>Client portal</a><a data-affiliate href="./portal.html?view=affiliate" hidden>Affiliate portal</a><a data-owner href="./portal.html?view=admin" hidden>Owner portal</a><a data-profile href="./portal.html?view=profile" hidden>Account settings</a><a data-guest href="./portal.html">Sign in / registration</a><a href="./contact.html">Contact support</a></div></details><button data-signout type="button" hidden>Sign out</button></div></div><p id="mirai-account-status" role="status" aria-live="polite"></p>`;
  header.after(bar);
  const resize = () => bar.style.setProperty('--mirai-nav-offset', header.getBoundingClientRect().height + 'px');
  resize();
  new ResizeObserver(resize).observe(header);
  const el = selector => bar.querySelector(selector);
  const details = el('details');
  document.addEventListener('click', e => { if (!details.contains(e.target)) details.open = false; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && details.open) { details.open = false; el('summary').focus(); } });
  let auth, revision = 0;
  function renderSession(session) {
    const signedIn = !!session?.user;
    el('[data-signin]').hidden = signedIn;
    el('[data-signout]').hidden = !signedIn;
    el('[data-guest]').hidden = signedIn;
    for (const selector of ['[data-client]', '[data-affiliate]', '[data-profile]']) el(selector).hidden = !signedIn;
    el('[data-owner]').hidden = true;
    el('summary').textContent = signedIn ? 'My account' : 'Account menu';
    el('.mirai-account-email').textContent = signedIn ? session.user.email : 'You are signed out.';
  }
  async function syncSession() {
    const version = ++revision;
    const { data, error } = await auth.auth.getSession();
    if (version !== revision) return;
    if (error) throw error;
    renderSession(data.session);
    if (!data.session) return;
    const result = await auth.rpc('mirai_account', { p_name: null });
    if (version !== revision) return;
    if (!result.error) el('[data-owner]').hidden = !result.data?.admin;
  }
  try {
    if (!window.miraiAuth && !window.supabase) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
        script.onload = resolve; script.onerror = () => reject(Error('Account service could not load. Open My portal to retry.'));
        document.head.append(script);
      });
    }
    auth = window.miraiAuth || window.supabase.createClient('https://qymwaujpaxbmeohcmueh.supabase.co', 'sb_publishable_sIt2p8INDif9VfTb4F81YQ_yEoGr5fE');
    window.miraiAuth = auth;
    el('[data-signout]').onclick = async () => {
      const button = el('[data-signout]'); button.disabled = true;
      el('#mirai-account-status').textContent = '';
      try {
        const { error } = await auth.auth.signOut({ scope: 'local' });
        if (error) throw error;
        revision++; renderSession(null); details.open = false;
        // Reload removes private data and in-flight renders from this page.
        location.replace(portalURL.href);
      } catch (error) {
        el('#mirai-account-status').textContent = 'Could not sign out. Please retry. ' + error.message;
        button.disabled = false;
      }
    };
    auth.auth.onAuthStateChange(() => {
      setTimeout(() => syncSession().catch(error => { el('#mirai-account-status').textContent = error.message; }), 0);
    });
    await syncSession();
  } catch (error) {
    renderSession(null);
    el('.mirai-account-email').textContent = 'Account status unavailable.';
    el('#mirai-account-status').textContent = error.message;
  }
})();


// Order policies are accessible on every page using this shared script.
(function addMiraiPolicyLinks(){
 const footer=document.querySelector('footer');
 if(!footer||document.getElementById('mirai-policy-links'))return;
 const nav=document.createElement('nav');nav.id='mirai-policy-links';
 nav.setAttribute('aria-label','Order policies');nav.style.cssText='text-align:center;padding:18px;font:13px/1.6 system-ui';
 nav.innerHTML='<a href="./policies.html#shipping">Shipping</a> · <a href="./policies.html#returns">Returns & refunds</a> · <a href="./policies.html#payments">Payments</a>';
 footer.appendChild(nav);
})();
