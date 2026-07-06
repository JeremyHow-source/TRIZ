/** Live score calculation on the questionnaire page */

document.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    const dateInput = document.getElementById('evalDate');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Pillar groups: which radio buttons belong to which pillar
    const pillarGroups = {
        T: ['t1', 't2', 't3', 't4', 't5'],
        P: ['p1', 'p2', 'p3', 'p4', 'p5'],
        I: ['i1', 'i2', 'i3', 'i4', 'i5'],
        O: ['o1', 'o2', 'o3', 'o4', 'o5']
    };

    function getPillarAvg(prefix) {
        const fields = pillarGroups[prefix];
        let sum = 0, count = 0;
        for (const f of fields) {
            const radios = document.querySelectorAll(`input[name="${f}"]`);
            for (const r of radios) {
                if (r.checked) {
                    sum += parseInt(r.value);
                    count++;
                    break;
                }
            }
        }
        return count > 0 ? (sum / count).toFixed(2) : null;
    }

    function updateScores() {
        const tAvg = getPillarAvg('T');
        const pAvg = getPillarAvg('P');
        const iAvg = getPillarAvg('I');
        const oAvg = getPillarAvg('O');

        document.getElementById('TAvg').textContent = tAvg !== null ? tAvg : '—';
        document.getElementById('PAvg').textContent = pAvg !== null ? pAvg : '—';
        document.getElementById('IAvg').textContent = iAvg !== null ? iAvg : '—';
        document.getElementById('OAvg').textContent = oAvg !== null ? oAvg : '—';

        const valid = [tAvg, pAvg, iAvg, oAvg].filter(v => v !== null);
        if (valid.length > 0) {
            const overall = valid.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / valid.length;
            document.getElementById('overallScore').textContent = overall.toFixed(2);
            // Performance band
            let band = '—';
            if (overall >= 4.5) band = 'Exceptional';
            else if (overall >= 3.5) band = 'Exceeds';
            else if (overall >= 2.5) band = 'Meets';
            else if (overall >= 1.5) band = 'Below';
            else band = 'Well Below';
            const bandEl = document.getElementById('overallBand');
            bandEl.textContent = band;
            // Color
            const colors = {
                'Exceptional': 'bg-success', 'Exceeds': 'bg-primary',
                'Meets': 'bg-warning text-dark', 'Below': 'bg-orange', 'Well Below': 'bg-danger'
            };
            bandEl.className = 'badge ms-2 ' + (colors[band] || 'bg-secondary');
            bandEl.style.fontSize = '1rem';
        } else {
            document.getElementById('overallScore').textContent = '—';
            document.getElementById('overallBand').textContent = '—';
        }
    }

    // Attach listeners to all rating radios
    document.querySelectorAll('.rating-group input[type="radio"]').forEach(r => {
        r.addEventListener('change', updateScores);
    });

    // Search/filter for database page
    const searchInput = document.getElementById('searchInput');
    const bandFilter = document.getElementById('bandFilter');
    if (searchInput && bandFilter) {
        function applyFilters() {
            const search = searchInput.value;
            const band = bandFilter.value;
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (band) params.set('band', band);
            window.location.href = '/database?' + params.toString();
        }
        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') applyFilters();
        });
        bandFilter.addEventListener('change', applyFilters);
    }
});
