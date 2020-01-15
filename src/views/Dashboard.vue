<template>
    <div class="dashboard">

        <div class="dash-tool">

            <v-toolbar 
                   class="p-8"
                   color="transparent"
                   elevation="0"
            >
            <v-toolbar-title><h2>Dashboard</h2></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    v-model="date"
                    v-on="on"
                    outlined
                    color="indigo"
                    >{{date}}</v-btn>
                </template>
                <v-date-picker
                    type="month"
                    v-model="date" 
                    ref="picker"
                    scrollable
                    :max="new Date().toISOString().substr(0, 10)"
                    min="2019-01-01">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
                </v-menu>
                <v-btn 
                    outlined 
                    color="indigo"
                    class="cst-btn"
                    @click="getData"
                >Fetch Data</v-btn>
            </v-toolbar-items>
            </v-toolbar>
        </div>

        <v-container
            class="fill-height"
            fluid
            
        >
            <v-row
            align="center"
            justify="center"
            >
            <v-col cols="3">
                <v-card
                    color="#0D2240"
                    dark
                    elevation="0"
                >
                    <v-card-title class="headline">Total Hours Volunteered</v-card-title>
                    <v-card-subtitle>{{date}}</v-card-subtitle>

                    <v-card-text>
                    <h1>{{totalHours}} Hours</h1>
                    </v-card-text>
                </v-card>
                </v-col>
            <v-col cols="3">
                <v-card
                    color="#7C98AB"
                    dark
                        elevation="0"
                >
                    <v-card-title class="headline">Money Saved</v-card-title>
                    <v-card-subtitle>{{date}}</v-card-subtitle>

                    <v-card-text>
                    <h1>${{dollarAmount}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
            <v-col cols="3">
                <v-card
                    color="#034078"
                    dark
                        elevation="0"
                >
                    <v-card-title class="headline">Volunteer of the Month</v-card-title>
                    <v-card-subtitle>{{date}}</v-card-subtitle>

                    <v-card-text>
                    <h1>{{topVolunteer}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>
            <v-col cols="3">
                <v-card
                    color="#E94F3D"
                    dark
                    elevation="0"
                >
                    <v-card-title class="headline">Unique Volunteers</v-card-title>
                    <v-card-subtitle>{{date}}</v-card-subtitle>

                    <v-card-text>
                    <h1>{{uniqueVolunteers}}</h1>
                    </v-card-text>
                </v-card>
                </v-col>

            </v-row>
            <v-row
                align="center"
                justify="center"
            >
                <v-col cols="8">
                    <div class="hours-month-graph">
                        <v-card
                            outlined
                        >
                            <v-card-title>
                                <h2>Hours Volunteered by User</h2>
                            </v-card-title>
                            <v-card-subtitle>
                                {{date}}
                            </v-card-subtitle>
                            <v-card-text>
                                <transition name="fade">
                                    <bar-chart
                                        v-if="loaded"
                                        :chartdata="barchartdata"
                                        :options="barchartoptions"
                                    />
                                </transition>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-col>

                
                <v-col
                    cols="4"
                >
                    <v-card
                        outlined
                    >
                        <v-card-title>
                            <h2>Catagories Distribution</h2>
                        </v-card-title>
                        <v-card-subtitle>
                            {{date}}
                        </v-card-subtitle>
                        <v-card-text>
                            <transition name="fade">
                                <pie-chart
                                    v-if="loaded"
                                    :chartdata="piechartdata"
                                    :options="piechartoptions"
                                />
                            </transition>
                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    
                >
                
                            <div class="table-area">
                                <h2 class="text-center">Top Volunteers this Month</h2>
                                <v-data-table
                                    :headers="headers"
                                    :items="rawData"
                                    :items-per-page="5"
                                    :sort-by="['hours']"
                                    :sort-desc="true"
                                />
                            </div>
                    </v-col> -->
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import { fireDb } from '@/plugins/firebaseConfig.js'

export default {
    name: 'Dashboard',
    components: { BarChart, PieChart },
    data: () => ({
        blankArray: [],
        familyCount: 0,
        techCount: 0,
        environmentCount: 0,
        healthCount: 0,
        otherCount: 0,
        pieData: [],
        catagories: [],
        modal: false,
        select: "Username",
        picker: new Date().toISOString().substr(0, 10),
        date: '2019-10',
        loaded: false,
        users: [],
        events: [],
        dates: [],
        names: [],
        rawData: [],
        result: [],
        totalHours: null,
        dollarAmount: 0,
        topVolunteer: null,
        uniqueVolunteers: null,
        barchartdata: {
            labels: null,
            datasets: [
            {
                label: 'Volunteer Hours October 2019',
                fontColor: '#fff',
                backgroundColor: '#7C98AB',
                data: null,
            }
            ]
        },
        barchartoptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        // fontColor: "white",
                        beginAtZero: true,
                        stacked: true,
                    },
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0.05)',
                        lineWidth: 1
                    }
                }],
                xAxes: [{
                    ticks: {
                        // fontColor: "white",
                        beginAtZero: true,
                        stacked: true
                    },
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0.05)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            legend: {
                display: false
            },
        },
        piechartdata: {
            labels: [
                'Youth & Families',
                'Innovation & Technology',
                'Environment & Animals',
                'Health & Wellbeing',
                'Other'
            ],
            datasets: [
            {
                label: 'Volunteer Hours October 2019',
                fontColor: '#fff',
                backgroundColor: ['#7C98AB', '#0D2240', '#E94F3D', '#034078', '#CBD6DD'],
                borderColor: 'transparent',
                data: null,

            }
            ]
        },
        piechartoptions: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            
            legend: {
                display: true
            },
        },
        headers: [
        {
            text: 'Users',
            align: 'left',
            sortable: true,
            value: 'userId',
        },
        { 
            text: 'Hours', 
            value: 'hours', 
            align: 'left' 
            },
        ],
    }),
    mounted () {
        this.getData()
        this.countCatagories()
    },
    methods: {
        getData() {
            this.resetData()
            let dateRef = this.date
            let eventsRef = fireDb.collection('volunteer-events')
            let query = eventsRef.where('date', '==', dateRef).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No events for this month.')
                    return
                }
                snapshot.forEach(doc => {
                    this.rawData.push((doc.id, '=>', doc.data()))
                    // this.events.push((doc.id, '=>', doc.data().hours))
                    // this.names.push((doc.id, '=>', doc.data().userId))
                    this.catagories.push(((doc.id, '=>', doc.data().catagories)))
                    //count catagory frequency for pie chart.
                    this.countCatagories(((doc.id, '=>', doc.data().catagories)))
                    
                })
                // consolidate duplicate events
                this.mergeEvents(this.rawData)
                // barchart labels               
                this.barchartdata.labels = this.names
                // barchart data
                this.barchartdata.datasets[0].data = this.events
                // barchart data
                this.barchartdata.datasets[0].label = `Volunteer Hours for ${this.date}`
                // pichart data
                this.addPieData()
                this.piechartdata.datasets[0].data = this.pieData
                // total hours
                this.totalHours = this.sumHours(this.events)
                // dollarAmount Catagory
                this.dollarAmount = this.getDollarAmount(this.totalHours)
                // top Volunteer 
                this.topVolunteer = this.getVolunteerOfTheMonth()
                // unique Volunteers
                this.uniqueVolunteers = this.names.length
                this.loaded = true
            })
            .catch(err => {
                console.log('You getting an error fool!', err)
            })
        },
        resetData() {
            this.catagories.length = 0
            this.rawData.length = 0
            this.events.length = 0
            this.names.length = 0
            this.barchartdata.labels = null
            this.barchartdata.datasets[0].data = null
            this.totalHours = 0
            this.uniqueVolunteers = 0
            this.topVolunteer = null
            this.pieData.length = 0
            this.dollarAmount = 0
            this.familyCount = 0
            this.techCount = 0
            this.environmentCount = 0
            this.healthCount = 0
            this.otherCount = 0
            this.loaded = false
        },
        countCatagories(arr) {
            if (arr.includes('Youth & Families')) { this.familyCount++ }
            if (arr.includes('Innovation & Technology')) { this.techCount++ }
            if (arr.includes('Environment & Animals')) { this.environmentCount++ }
            if (arr.includes('Health & Wellbeing')) { this.healthCount++ }
            if (arr.includes('Other')) { this.otherCount++ }
        },
        addPieData() {
            this.pieData.push(this.familyCount)
            this.pieData.push(this.techCount)
            this.pieData.push(this.environmentCount)
            this.pieData.push(this.healthCount)
            this.pieData.push(this.otherCount)
        },
        mergeEvents(arr) {
            let result = [];
            arr.forEach(function (a) {
                if (!this[a.userId]) {
                    this[a.userId] = { userId: a.userId, hours: 0 };
                    result.push(this[a.userId]);
                }
                this[a.userId].hours += a.hours;
            }, Object.create(null));
            result.forEach(el => {
                this.names.push(el.userId)
                this.events.push(el.hours)
            })
        },
        sumHours(hours) {
            return hours.reduce((totalHours, hour) => totalHours + hour)
        },
        getDollarAmount(hours) {
            return (hours * 25.40).toFixed(2)
        },
        getTopCatagory(array) {
            let mf = 1
            let m = 0
            let item
            for (var i=0; i< array.length; i++)
            {
                for (var j=i; j<array.length; j++) {
                    if (array[i] == array[j])
                    m++
                    if (mf<m) {
                        mf=m
                        item = array[i]
                    }
                }
                m=0
            }
            return item
        },
        getVolunteerOfTheMonth() {
            let keys = this.names
            let values = this.events
            let result = {}
            keys.forEach((key, i) => result[key] = values[i])

            return Object.keys(result).reduce(function(a, b){ return result[a] > result[b] ? a : b });
    },
    }
}
</script>

<style>

     .month-selector {
        width: 150px;
        padding-bottom: 2em;
    }
    .hours-graph-title {
        font-size: 3em;
    }
</style>