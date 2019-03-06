<template>
<div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Url</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row v-for="web in websites">
        <md-table-cell md-numeric>{{ web.id }}</md-table-cell>
        <md-table-cell>{{ web.name }}</md-table-cell>
        <md-table-cell>{{ web.url }}</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import WebsitesService from '@/services/WebsitesService'
export default {
  name: 'List',
  data: function () {
    return {
      websites: []
    }
  },
  mounted () {
    this.fetch().then()
  },
  methods: {
    fetch: async function () {
      this.websites = (await WebsitesService.index()).data
    }
  }
}
</script>
