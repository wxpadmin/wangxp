<template>
    <div class="wrap">
        <div class="title" @click="sure">
            {{province}}省{{city}}市{{county}}县
        </div>
        <div class="popup" @click="close" v-if="popshow">
            <!--<div class="status">
                <div>{{province}}省</div>
                <div>{{city}}市</div>
                <div>{{county}}县</div>
                <div @click="close">确定</div>
            </div>-->
            <div class="content" @click.stop>
                <ul v-if="!province">
                    <li v-for="item in provinceList" @click="proclick">{{item.name}}</li>
                </ul>
                <ul v-if="!city && province">
                    <li v-for="item in cityList" @click="cityclick">{{item.name}}</li>
                </ul>
                <ul v-if="!county && city">
                    <li v-for="item in countyList" @click="countyclick">{{item.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import dataJson from '../json/area.json'
    export default {
        mounted () {
            dataJson.RECORDS.forEach((item)=>{
                if (item["level"] == 1) {
                    this.provinceList.push({name : item.short_name,id : item.id})
                }
            })
        },
        data () {
            return {
                popshow : true,
                province : '',
                city : '',
                county : '',
                provinceList : [],
                cityList : [],
                countyList : []
            }
        },
        methods : {
            close () {
                this.popshow = false
            },
            proclick (e) {
                this.province = e.target.innerText
                dataJson.RECORDS.forEach((item)=>{
                    this.provinceList.forEach((item1)=>{
                        if (item1.name == this.province && item.parent_id == item1.id) {
                            this.cityList.push({name : item.short_name,id : item.id})
                        }
                    })
                })
            },
            cityclick (e) {
                this.city = e.target.innerText
                dataJson.RECORDS.forEach((item)=>{
                    this.cityList.forEach((item1)=>{
                        if (item1.name == this.city && item.parent_id == item1.id) {
                            this.countyList.push({name : item.short_name,id : item.id})
                        }
                    })
                })
            },
            countyclick (e) {
                this.county = e.target.innerText
            },
            sure () {
                this.popshow = true
                this.province = ''
                this.city = ''
                this.county = ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height:100%;
        .title{
            width: 100%;
            height:1rem;
            background-color: #fff;
        }
        .popup{
            width: 100%;
            height:100%;
            background-color: rgba(0,0,0,.5);
            position: fixed;
            top:0;
            left: 0;
        }
        .status{
            display: flex;
            width: 100%;
            height:.5rem;
            background-color: #fff;
            position: absolute;
            bottom:5rem;
            left: 0;
            div{
                width: 25%;
                text-align: right;
            }
        }
        .content{
            width: 100%;
            height:8rem;
            background-color: #fff;
            position: absolute;
            bottom:0;
            left: 0;
            overflow-y: scroll;
        }
        ul{
            width: 100%;
            height:5rem;
            position: absolute;
            bottom: 0;
            li{
                width: 100%;
                height:.6rem;
                line-height: .6rem;
                text-align: center
            }
        }
    }
</style>
