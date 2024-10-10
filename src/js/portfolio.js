import {declOfNum} from "./utils/decline.js";
import {createApp, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import dayjs from "dayjs";

// const container = document.getElementById('portfolio-age');

// container.innerText = text;

const data = [
    {
        company: 'ООО "Вайлдберриз"',
        companyType: 'Панель администрирования для внутренних проектов',
        job: 'Front-end Developer',
        date: [dayjs().format('MMM YYYY'), dayjs('01 Apr 2024 00:00:00 GMT').format('MMM YYYY')],
        skills: [
            'React',
            'NextUI',
            'Effector',
        ],
        responsibilities: [
            'Панель администрирования для внутренних задач',
            'Постановка и приоретизация задач',
            'Архитектура проекта',
        ]
    },
    {
        company: 'ГК «Иннотех»',
        companyType: 'Информационные технологии',
        job: 'Senior front-end developer',
        date: [dayjs('01 March 2024 00:00:00 GMT').format('MMM YYYY'), dayjs('01 Jan 2021 00:00:00 GMT').format('MMM YYYY')],
        skills: [
            'Redux-saga',
            'NEXT.js',
            'SCURM',
            'Module Federation',
        ],
        responsibilities: [
            'Работа в команде. SCRUM ',
            'Работа над 3-4 проектами (для внутренних проектов и маркетплейс)',
            'Взаимодействие со всеми членами команды и принятие лучшей стратегии',
            'Кроссбраузерность, тестирование, UI Kit, интеграции в проект',
        ]
    },
    {
        company: 'EasyCRM',
        companyType: 'Панель администрирования для бизнеса',
        job: 'Full stack developer',
        date: [dayjs('01 Apr 2024 00:00:00 GMT').format('MMM YYYY'), dayjs('01 Dec 2023 00:00:00 GMT').format('MMM YYYY')],
        skills: [
            'Sequelize',
            'Node.js',
            'Vue 3',
            'Vite',
        ],
        responsibilities: [
            'Полное сопровождение проекта',
            'Постановка и приоритизация задач',
            'Front-end, Back-and (30%)',
            'Разработка UI Kit (не чистый)',
            'Дизайн админки',
        ]
    },
    {
        company: 'ООО «А-БТ»',
        companyType: 'Комплексное производство и внедрение инновационных решений',
        job: 'Janior front-end developer',
        date: [dayjs('01 Jan 2021 00:00:00 GMT').format('MMM YYYY'), dayjs('01 Jan 2018 00:00:00 GMT').format('MMM YYYY')],
        skills: [
            'React',
            'Node.js',
            'Feathers',
            'Styled-components',
        ],
        responsibilities: [
            'Разработка SPA для терминалов',
        ]
    },
]

createApp({
    setup() {
        const message = ref('Hello Vue!')
        const age = dayjs().year() - dayjs('01 Sep 1991 00:00:00 GMT').year();
        const text = `${age} ${declOfNum(age, ['год', 'года', 'годы'])}`;

        function getDiffDates(el) {
            const months = dayjs(el.date[0]).diff(dayjs(el.date[1]), "months")
            const years = Math.floor(months / 12);
            const showedMonth = years ? months - years * 12 : months;
            const textMonth = `${showedMonth} ${declOfNum(showedMonth, ['месяц', 'месяца', 'месяцев'])}`
            const textYear = `${years} ${declOfNum(years, ['год', 'года', 'года'])}`
            const dateText = years && showedMonth ? `${textYear} ${textMonth}` : !showedMonth ? textYear : textMonth
            return {...el, age: dateText}
        }

        return {
            message,
            age: text,
            data: data.map(getDiffDates),
        }
    }
}).mount('#experience')