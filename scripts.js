// Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-controls button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animated Metrics
    function animateMetrics() {
        const metrics = document.querySelectorAll('.interactive-metrics .metric');
        
        metrics.forEach(metric => {
            const target = parseInt(metric.dataset.value);
            const valueElement = metric.querySelector('.metric-value');
            let current = 0;
            
            const interval = setInterval(() => {
                if (current >= target) {
                    clearInterval(interval);
                    return;
                }
                current++;
                valueElement.textContent = current + (valueElement.textContent.includes('%') ? '%' : '');
            }, 20);
        });
    }

    // Chart Initialization
    const initCharts = () => {
        const chartElements = document.querySelectorAll('.project-chart');
        
        chartElements.forEach(chartElement => {
            new Chart(chartElement.getContext('2d'), {
                type: 'bar',
                data: JSON.parse(chartElement.dataset.chartData),
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        });
    };

    // Initialize everything
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                initCharts();
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.interactive-metrics, .chart-container').forEach(section => {
        observer.observe(section);
    });
});