class HealthBar extends StatusBar {
    /**
     * Creates a new health status bar with all health
     * status images and initializes the health value to 100%.
     */
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
        ], 40, 0, 100);
    }
}