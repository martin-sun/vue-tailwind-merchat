<template>
  <el-select filterable remote 
    :remote-method="searchCities"
    v-model="cityId"
    :loading="isLoading"
  >
    <el-option v-for="city in cities" :key="city.id"
      :value="city.city_id"
      :label="city.city_name"
    ></el-option>
  </el-select>
</template>
<script>
import { searchCities, getCityInfo } from '@/api/common'

export default {
  name: 'CitySelector',
  props: {
    value: {
      type: Number,
      default: 6 // 萨斯卡通
    }
  },
  data () {
    return {
      cityId: 6,
      cities: [],
      isLoading: false
    }
  },
  watch: {
    cityId (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.isLoading = true
    this.cityId = this.value
    getCityInfo(this.value).then(cityInfo => {
      this.cities = [{ city_id: this.value, ...cityInfo }]
      this.isLoading = false
    })
  },
  methods: {
    async searchCities (keyword) {
      if (!Number.isNaN(+keyword)) {
        return
      }
      if (!keyword) {
        return
      }
      this.isLoading = true
      const { cities } = await searchCities(keyword)
      this.cities = cities
      this.isLoading = false
    }
  }
}
</script>

