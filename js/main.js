const app = Vue.createApp({
    data: () => ({
        totalPoint: 500000,
        basePoint: 600, //イベント無特攻の場合のベース値
        myMagnification: 1.0,
        myTotalPoint: 0,
        baseAp: 65,
        mustDayAp: 0,
        isEvent: true,
        quests: [
            { name: '駆け出し', ap: 20, basePoint: 40},
            { name: '熟練', ap: 30, basePoint: 80},
            { name: '精鋭', ap: 40, basePoint: 170},
            { name: '天上', ap: 55, basePoint: 350},
            { name: '修羅', ap: 65, basePoint:  600}
        ],
        selectQuest: '修羅'
    }),
    computed: {
        getEventState: function () {
            this.isEvent = this.getDay().isEventEnd
        }
    },
    methods: {
        getDay: function () {
            const toDay = new Date()
            const eventEndDay = new Date('2022/10/19 13:59:59')
            const isEventEnd = toDay <= eventEndDay
            return { toDay, eventEndDay, isEventEnd }
        },
        selectedQuests: function() {
            let getQuestObj =  ''
            this.quests.forEach((key) => {
                if(key.name === this.selectQuest) getQuestObj = key
            })
            return getQuestObj
        },
        resultCount: function() {
            if(this.myMagnification === 0 || this.myMagnification === '') return '?'
            const getQuestObj =  this.selectedQuests()
            const getPoint =  getQuestObj.basePoint * this.myMagnification
            return  Math.ceil((this.totalPoint - this.myTotalPoint) / getPoint)
        },
        resultAp: function () {
            if(this.resultCount() === '?') return '?'
            const getQuestObj =  this.selectedQuests()
            return (this.resultCount() * getQuestObj.ap)
        },
        norma: function() {
            if(this.resultCount() === '?') return '?'
            const toDay = this.getDay().toDay
            const eventEndDay = this.getDay().eventEndDay
            if(toDay < eventEndDay){
                const limitDay = new Date(eventEndDay - toDay).getDate()
                return Math.ceil(this.resultCount() / limitDay)
            }
        },
        oncePoint: function() {
            if(this.myMagnification === 0 || this.myMagnification === '') return '?'
            const getQuestObj =  this.selectedQuests()
            return (getQuestObj.basePoint * this.myMagnification)
        },
        dayAp: function() {
            if(this.resultCount() === '?') return '?'
            const getQuestObj =  this.selectedQuests()
            return (getQuestObj.ap * this.norma())
        }
    }
});


app.mount('#app');