// Matrix rain animation
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポabcdefghijklmnopqrstuvwxyz0123456789';
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);

    let drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 50);

    // Handle window resize
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drops = Array(Math.floor(width / fontSize)).fill(1);
    });

    // Generate random unban report
    function generateReport(number) {
      const reasons = [
        "I believe my account was mistakenly banned.",
        "Please review my case as I have not violated any policies.",
        "I am a loyal user and request a reconsideration of the ban.",
        "My account was hacked and I need it restored urgently.",
        "I have always followed WhatsApp's terms and conditions.",
        "Kindly lift the ban at your earliest convenience.",
        "I depend on WhatsApp for business and personal communication.",
        "This ban has severely impacted my daily life and work.",
        "Please investigate and rectify this misunderstanding.",
        "I sincerely apologize if any mistake occurred unintentionally."
      ];

      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      const report = 
        `Hello WhatsApp Support Team,\n\n` +
        `My WhatsApp number: ${number}\n\n` +
        `Reason for unban request:\n${randomReason}\n\n` +
        `I kindly request you to review my case and restore my account.\n` +
        `Thank you very much for your time and support.\n\n` +
        `Best regards,\nKing Database Unban User`;

      return report;
    }

    // Validation function
    function isValidPhone(number) {
      const regex = /^\+?[1-9]\d{9,14}$/;
      return regex.test(number);
    }

    // Handle button click
    
document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const mobileInput = document.getElementById('mobileNumber');
  const codeDisplay = document.getElementById('codeDisplay');
  const loading = document.getElementById('loading');
  const number = mobileInput.value.trim();

  if (!isValidPhone(number)) {
    codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Invalid phone number. Please enter a valid WhatsApp number with country code.</div>';
    return;
  }

  loading.style.display = 'block';
  codeDisplay.textContent = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const report = generateReport(number);
    codeDisplay.textContent = report;
    loading.style.display = 'none';

    // Prepare mailto link and trigger default mail client
    const subject = encodeURIComponent('WhatsApp Unban Request');
    const body = encodeURIComponent(report);
    const mailtoLink = `mailto:support@support.whatsapp.com?subject=${subject}&body=${body}`;
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.click();
  } catch (error) {
    loading.style.display = 'none';
    codeDisplay.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to generate unban request. Please try again.</div>';
  }
});


    // Copy report text
    function copyReport() {
      const codeDisplay = document.getElementById('codeDisplay');
      const text = codeDisplay.textContent.trim();

      if (!text || text === 'Your unban report will appear here') return;

      navigator.clipboard.writeText(text).then(function() {
        navigator.clipboard.writeText(text).then(() => {
          alert('Report copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy report. Please copy manually.');
        });
      })();
    }