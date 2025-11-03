// script principal do HUD: hover, clicks e animações
document.addEventListener('DOMContentLoaded', () => {
    // Hover suave nas habilidades (aprimora a transformação, mantendo o rotate base)
    document.querySelectorAll('.ability').forEach(ability => {
        ability.addEventListener('mouseenter', () => {
            ability.style.transform = 'rotate(45deg) scale(1.08)';
        });
        ability.addEventListener('mouseleave', () => {
            ability.style.transform = 'rotate(45deg)';
        });
    });

    // Toggle de habilidade ativa ao clicar
    document.querySelectorAll('.ability').forEach(ability => {
        ability.addEventListener('click', () => ability.classList.toggle('active'));
    });

    // Setas de health bar: aumentam/diminuem a barra associada
    document.querySelectorAll('.health-arrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            const wrapper = this.parentElement;
            const fills = wrapper.querySelectorAll('.health-bar-fill, .mana-bar-fill');
            fills.forEach(fill => {
                const current = parseInt(fill.style.width) || 75;
                const delta = (this.textContent === '›') ? 10 : -10;
                const next = Math.max(0, Math.min(100, current + delta));
                fill.style.width = next + '%';
            });
        });
    });

    // Simulação: clique nas barras para reduzir (dano/uso)
    document.querySelectorAll('.health-bar-fill, .mana-bar-fill').forEach(fill => {
        fill.addEventListener('click', function(e) {
            e.stopPropagation();
            const cur = parseInt(this.style.width) || 100;
            this.style.width = Math.max(0, cur - 10) + '%';
        });
    });

    // Regeneração periódica (visual)
    setInterval(() => {
        document.querySelectorAll('.health-bar-fill').forEach(b => {
            const cur = parseInt(b.style.width) || 75;
            if (cur < 100) b.style.width = Math.min(100, cur + 1) + '%';
        });
        document.querySelectorAll('.mana-bar-fill').forEach(m => {
            const cur = parseInt(m.style.width) || 60;
            if (cur < 100) m.style.width = Math.min(100, cur + 2) + '%';
        });
    }, 1000);

    // Animação inicial: barras crescem de 0 até o valor definido inline
    window.requestAnimationFrame(() => {
        document.querySelectorAll('.health-bar-fill, .mana-bar-fill, .ability-health-fill, .ability-mana-fill').forEach(bar => {
            const target = bar.getAttribute('data-target') || bar.style.width || '75%';
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = target; }, 150);
        });
    });
});