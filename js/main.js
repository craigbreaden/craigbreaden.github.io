/* ============================================
   Engineered by Breaden - Interactive JS
   ============================================ */

(function () {
  'use strict';

  // ---- Particle Background ----
  const particleCanvas = document.getElementById('particles');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let w, h;
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;
    let mouse = { x: null, y: null };
    let animFrame;

    function resize() {
      w = particleCanvas.width = window.innerWidth;
      h = particleCanvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Draw particle -- mix of cyan and electric green
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 212, 255, 0.35)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // ---- Terminal Typing Animation ----
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalOutput) {
    const lines = [
      { type: 'command', text: 'whoami' },
      { type: 'output', text: 'Craig Breaden', className: 'name' },
      { type: 'blank' },
      { type: 'command', text: 'cat role.txt' },
      { type: 'output', text: 'Head of Engineering @ DaisyChain Energy' },
      { type: 'output', text: 'New York, NY' },
      { type: 'blank' },
      { type: 'command', text: 'cat mission.txt' },
      {
        type: 'output',
        text: 'Building control systems for the grid edge.',
        className: 'highlight',
      },
      {
        type: 'output',
        text: 'From microgrids to megawatts.',
        className: 'highlight',
      },
      {
        type: 'output',
        text: 'Curious about everything else.',
        className: 'highlight',
      },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = null;
    const cursor = document.getElementById('terminal-cursor');

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        if (cursor) cursor.style.display = 'inline';
        return;
      }

      const line = lines[lineIndex];

      if (line.type === 'blank') {
        const br = document.createElement('div');
        br.style.height = '8px';
        terminalOutput.appendChild(br);
        lineIndex++;
        setTimeout(typeNextChar, 100);
        return;
      }

      if (!currentLine) {
        currentLine = document.createElement('div');
        currentLine.classList.add('line');
        currentLine.style.animationDelay = '0s';
        currentLine.style.opacity = '1';

        if (line.type === 'command') {
          const prompt = document.createElement('span');
          prompt.classList.add('prompt');
          prompt.textContent = '$';
          currentLine.appendChild(prompt);

          const cmd = document.createElement('span');
          cmd.classList.add('command');
          currentLine.appendChild(cmd);
        } else {
          const out = document.createElement('span');
          out.classList.add('output');
          if (line.className) out.classList.add(line.className);
          currentLine.appendChild(out);
        }

        terminalOutput.appendChild(currentLine);
      }

      const textSpan = currentLine.lastElementChild;
      const fullText = line.text;

      if (charIndex < fullText.length) {
        textSpan.textContent += fullText[charIndex];
        charIndex++;
        const speed = line.type === 'command' ? 45 : 20;
        setTimeout(typeNextChar, speed);
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = null;
        const pause = line.type === 'command' ? 400 : 80;
        setTimeout(typeNextChar, pause);
      }
    }

    // Start typing after a brief delay
    setTimeout(typeNextChar, 800);
  }

  // ---- Skills Category Switching ----
  const categoryButtons = document.querySelectorAll('.skill-category');
  const skillGroups = document.querySelectorAll('.skill-group');

  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;

      categoryButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      skillGroups.forEach((g) => {
        g.classList.remove('active');
        if (g.dataset.group === cat) {
          g.classList.add('active');
        }
      });
    });
  });

  // ---- Skill Node Tooltips ----
  const tooltip = document.getElementById('skill-tooltip');
  const skillNodes = document.querySelectorAll('.skill-node');

  skillNodes.forEach((node) => {
    node.addEventListener('mouseenter', (e) => {
      const text = node.dataset.tooltip;
      if (!text || !tooltip) return;
      tooltip.textContent = text;
      tooltip.classList.add('visible');
      positionTooltip(e);
    });

    node.addEventListener('mousemove', (e) => {
      positionTooltip(e);
    });

    node.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.remove('visible');
    });
  });

  function positionTooltip(e) {
    if (!tooltip) return;
    const pad = 16;
    let x = e.clientX + pad;
    let y = e.clientY + pad;

    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - pad) {
      x = e.clientX - rect.width - pad;
    }
    if (y + rect.height > window.innerHeight - pad) {
      y = e.clientY - rect.height - pad;
    }

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }

  // ---- Navigation ----
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Scroll detection for nav background
  let lastScroll = 0;
  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;
      if (nav) {
        nav.classList.toggle('scrolled', scrollY > 50);
      }
      lastScroll = scrollY;
    },
    { passive: true }
  );

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      if (navLinks) navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  navAnchors.forEach((a) => {
    a.addEventListener('click', () => {
      if (navToggle) navToggle.classList.remove('open');
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop - 80;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navAnchors.forEach((a) => {
        if (a.getAttribute('href') === '#' + id) {
          a.classList.toggle('active', scrollY >= top && scrollY < bottom);
        }
      });
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Scroll Reveal Animation ----
  function addFadeInElements() {
    const targets = document.querySelectorAll(
      '.about-grid, .about-image-wrapper, .about-text, ' +
        '.skills-categories, .skills-display, ' +
        '.orbit-system, ' +
        '.life-card, ' +
        '.book-card, .reading-footer, ' +
        '.musings-placeholder'
    );
    targets.forEach((el) => el.classList.add('fade-in'));
  }

  addFadeInElements();

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach((el) => {
    fadeObserver.observe(el);
  });

  // ---- Metric Bar Animation ----
  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.metric-fill');
          fills.forEach((fill) => {
            const width = fill.dataset.width;
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 200);
          });
          metricObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.life-card').forEach((card) => {
    metricObserver.observe(card);
  });

  // ---- Interest Node Connection Lines ----
  // Draw SVG lines connecting interests to the center
  function drawInterestConnections() {
    const system = document.querySelector('.orbit-system');
    if (!system) return;

    // Remove existing SVG if any
    const existing = system.querySelector('.connection-lines');
    if (existing) existing.remove();

    // Skip connection lines when orbit is in grid mode (tablet/mobile)
    const style = window.getComputedStyle(system);
    if (style.display === 'grid') return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('connection-lines');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';

    const systemRect = system.getBoundingClientRect();
    const centerX = systemRect.width / 2;
    const centerY = systemRect.height / 2;

    const nodes = system.querySelectorAll('.interest-node');
    nodes.forEach((node) => {
      const nodeRect = node.getBoundingClientRect();
      const nodeX = nodeRect.left - systemRect.left + nodeRect.width / 2;
      const nodeY = nodeRect.top - systemRect.top + nodeRect.height / 2;

      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', nodeX);
      line.setAttribute('y2', nodeY);
      line.setAttribute('stroke', 'rgba(139, 92, 246, 0.08)');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-dasharray', '4,4');
      svg.appendChild(line);
    });

    system.insertBefore(svg, system.firstChild);
  }

  // Draw connections after layout settles
  setTimeout(drawInterestConnections, 500);
  window.addEventListener('resize', () => {
    setTimeout(drawInterestConnections, 100);
  });

  // ---- Mobile Touch Support for Interest Nodes ----
  const interestNodes = document.querySelectorAll('.interest-node');
  interestNodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      // Only apply touch toggle on small screens
      if (window.innerWidth > 640) return;
      e.preventDefault();
      const wasActive = node.classList.contains('touched');
      interestNodes.forEach((n) => n.classList.remove('touched'));
      if (!wasActive) node.classList.add('touched');
    });
  });

  // ---- ARIA: Add roles to interactive elements ----
  skillNodes.forEach((node) => {
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', node.querySelector('.node-name').textContent);
  });

  categoryButtons.forEach((btn) => {
    btn.setAttribute('role', 'tab');
    const isActive = btn.classList.contains('active');
    btn.setAttribute('aria-selected', String(isActive));
  });

  // Update aria-selected when category changes
  const originalCategoryHandler = () => {
    categoryButtons.forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn.classList.contains('active')));
    });
  };
  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', originalCategoryHandler);
  });

  interestNodes.forEach((node) => {
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    const label = node.querySelector('.interest-label');
    if (label) node.setAttribute('aria-label', label.textContent);
  });
})();
