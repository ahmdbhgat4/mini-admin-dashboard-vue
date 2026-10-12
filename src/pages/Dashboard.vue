<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="dash">
        <div class="strip">
            <div>
                <small data-i18n="s1">{{ t('s1') }}</small>
                <b>1,284</b><span class="up">+4.2%</span>
            </div>
            <div>
                <small data-i18n="s2">{{ t('s2') }}</small>
                <b>342</b><span class="up">+1.1%</span>
            </div>
            <div>
                <small data-i18n="s3">{{ t('s3') }}</small>
                <b>17</b><span class="up" style="color: var(--bad)">+3</span>
            </div>
            <div>
                <small data-i18n="s4">{{ t('s4') }}</small>
                <b>99.9%</b><span class="up">30 days</span>
            </div>
        </div>
        <div class="grid">
            <div class="panel">
                <h2 data-i18n="chart">{{ t('chart') }}</h2>
                <div class="bars">
                    <span style="height: 38%"></span><span style="height: 55%"></span><span style="height: 46%"></span>
                    <span class="hi" style="height: 90%"></span><span style="height: 62%"></span>
                    <span style="height: 30%"></span><span style="height: 24%"></span>
                </div>
                <div class="days">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </div>
            <div class="panel">
                <h2 data-i18n="recent">{{ t('recent') }}</h2>
                <ul class="act">
                    <li>
                        <span class="av" style="background: var(--ink); color: var(--bg)">L</span>
                        <div>Layla updated a profile<small>5 min ago</small></div>
                    </li>
                    <li>
                        <span class="av" style="background: var(--ink); color: var(--bg)">O</span>
                        <div>Omar changed a role<small>40 min ago</small></div>
                    </li>
                    <li>
                        <span class="av" style="background: var(--ink); color: var(--bg)">S</span>
                        <div>Sara exported a report<small>Yesterday</small></div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
