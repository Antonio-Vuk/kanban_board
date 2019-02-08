<template>
    <v-container>
        <v-layout class="row" >
                <v-flex mr-4>
                    <v-text-field mx-4
                    v-model="mainObject.name"
                    label="Name"
                    ></v-text-field>
                </v-flex>
                <v-flex mr-4 name="desc">
                    <v-text-field
                    v-model="mainObject.task"
                    label="Task description"
                    ></v-text-field>
                </v-flex>
                <v-btn primary flat @click="createTask">
                    Create new task
                </v-btn>
                <v-btn primary flat @click="OnSaveData">
                    Save data
                </v-btn>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs3 v-for="i in mainObject.names" :key="i.id">
                <v-card :color="i.color">
                    <v-card-title>
                        {{i.name}}
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                class="primary--text"
                :width="7"
                :size="70"
                indeterminate>
                </v-progress-circular>
            </v-flex>
        </v-layout>


        <v-layout v-else>
            <v-flex xs3 v-for="i in 4" :key="i">
                <draggable :id="i" v-model="mainObject.lists[i-1]" :move="onMove" primary :options="{group:{name: 'people'}, sort:true}">
                    <v-card
                    v-for="element in mainObject.lists[i-1]"
                    :key="element.id">

                        <v-card-text>
                            <div style="color:blue;">
                                <h3>
                                    {{element.name}}
                                </h3>
                            </div>
                            <div>
                                {{element.desc}}
                            </div>
                            <div>
                                Time: {{element.time}}
                            </div>
                            <div>
                                Status: {{element.status}}
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn 
                            @click="onDownClick(element)"
                            info flat>
                                <v-icon>navigate_before</v-icon>
                            </v-btn>

                            <v-btn 
                            @click="onUpClick(element)"
                            info flat>
                                <v-icon>navigate_next</v-icon>
                            </v-btn>

                            <v-btn 
                            @click="onDeleteClick(element)"
                            info flat>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </draggable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import * as firebase from 'firebase'

export default {
    created(){
        this.$store.dispatch('setLoading', true)
        firebase.database().ref('meinObj').once('value')
        .then((data) => {
            this.$store.dispatch('setLoading', false)
            if(data.val == null){
                return;
            }
            const obj = data.val()
            this.mainObject = obj;
        })
        .catch(error => {
            this.$store.dispatch('setLoading', false)
            console.log(error)
        })
    },
    data(){
        return{
            mainObject: {
                task: '',
                name: '',
                id: 1,
                names: [
                    {color: 'red', name: 'To do', id: 1},
                    {color: 'yellow', name: 'Doing', id: 2},
                    {color: 'green', name: 'Testing', id: 3},
                    {color: 'blue', name: 'Done', id: 4}
                ],
                userId: null,
                lists: [
                    [
                        // {id: 5, name: 'toni', desc: 'Izraditi bazu podataka', time: 2, status: 1},
                        // {id: 6, name: 'kreso', desc: 'Napraviti front-end', time: 1, status: 1},
                        // {id: 7, name: 'ivan', desc: 'Omoguciti beck-end', time: 5, status: 1},
                        // {id: 8, name: 'jana', desc: 'Unijeti sve podatke', time: 4, status: 1},
                    ],
                    [
                        // {id: 9, name: 'mihaela', desc: '-', time: 3, status: 2},
                        // {id: 10, name: 'slavica', desc: '-', time: 7, status: 2},
                        // {id: 11, name: 'zaljko', desc: '-', time: 5, status: 2},
                        // {id: 12, name: 'daniel', desc: '-', time: 4, status: 2},
                    ],
                    [
                        // {id: 13, name: 'tina', desc: '-', time: 7, status: 3},
                        // {id: 14, name: 'maja', desc: '-', time: 5, status: 3},
                        // {id: 15, name: 'klara', desc: '-', time: 3, status: 3}
                    ],
                    []
                ],
            }
        }
    },
    components: {
        draggable,
    },
    computed: {
        loading(){
            return this.$store.getters.loading
        }
    },
    methods:{
        onUpClick(element){
            element.time++;
        },
        onDownClick(element){
            if(element.time > 0){
                element.time--;
            }
        },
        onDeleteClick(element){
            var id = element.id
            var status = element.status
            if(element.status == 1){
                if(this.mainObject.lists[0].length > 1){
                    var index = this.mainObject.lists[status-1].findIndex(item => item.id == id)
                    this.mainObject.lists[status-1].splice(index, 1)
                }
            }
            if(element.status == 2){
                if(this.mainObject.lists[1].length > 1){
                    var index = this.mainObject.lists[status-1].findIndex(item => item.id == id)
                    this.mainObject.lists[status-1].splice(index, 1)
                }
            }
            if(element.status == 3){
                if(this.mainObject.lists[2].length > 1){
                    var index = this.mainObject.lists[status-1].findIndex(item => item.id == id)
                    this.mainObject.lists[status-1].splice(index, 1)
                }
            }
            if(element.status == 4){
                if(this.mainObject.lists[3].length > 1){
                    var index = this.mainObject.lists[status-1].findIndex(item => item.id == id)
                    this.mainObject.lists[status-1].splice(index, 1)
                }
            }
        },
        onMove(event){

            if(this.mainObject.lists[event.from.id - 1].length == 0){
            
                
                
                
            }

            event.draggedContext.element.status = event.to.id; 
        },
        createTask(){
            if(this.mainObject.name == ''){
                return
            }
            if(this.mainObject.task == ''){
                return
            }

            this.mainObject.lists[0].push({
                id: this.mainObject.id++, name: this.mainObject.name, desc: this.mainObject.task, time: 0, status: 1
            })

            this.mainObject.task = ""
            this.mainObject.name = ""
        },
        OnSaveData(){

            if( this.mainObject.lists[0].length >= 1 &&
                this.mainObject.lists[1].length >= 1 &&
                this.mainObject.lists[2].length >= 1 &&
                this.mainObject.lists[3].length >= 1 
            ){
                this.$store.dispatch('setLoading', true)
                firebase.database().ref('meinObj').set(this.mainObject)
                .then(() => {
                    this.$store.dispatch('setLoading', false)
                })
                .catch((error) => {
                    this.$store.dispatch('setLoading', false)
                    console.log(error)
                })
            }
        }
    }
}
</script>