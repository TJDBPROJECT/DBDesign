


<!-- 实现广州啥的显示 -->

<template>
  <div class="baidu-map" ref="mapContainer"></div>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'http://api.map.baidu.com/api?v=3.0&ak=6p5MmRood0q6FYqDDF9FQhXOM3obsUn7';
    script.onload = this.initializeMap;
    document.body.appendChild(script);
  },
  methods: {
    initializeMap() {
      const map = new window.BMap.Map(this.$refs.mapContainer);

      // Set default center and zoom level
      const defaultCenter = new window.BMap.Point(120, 30);
      map.centerAndZoom(defaultCenter, 15);

      // Add zoom control
      map.addControl(new window.BMap.NavigationControl());

      // Add markers for each location
      this.locations.forEach(location => {
        const point = new window.BMap.Point(location.lng, location.lat);
        const marker = new window.BMap.Marker(point);
        map.addOverlay(marker);

        const infoWindow = new window.BMap.InfoWindow(location.name);
        marker.addEventListener("click", function () {
          this.openInfoWindow(infoWindow);
        });
        marker.openInfoWindow(infoWindow);
      });
    },
  },
};
</script>

<style scoped>
.baidu-map {
  width: 100%;
  height: 80%;
}
</style>





  

   <template>
    <div class="baidu-map" ref="mapContainer"></div>
  </template>
  
  <script>
  export default {
    props: {
      locations: {
        type: Array,
        default: () => []
      }
    },
    mounted() {
      const script = document.createElement('script');
      script.src = 'http://api.map.baidu.com/api?v=3.0&ak=6p5MmRood0q6FYqDDF9FQhXOM3obsUn7';
      script.onload = this.initializeMap;
      document.body.appendChild(script);
    },
    methods: {
      initializeMap() {
        const map = new window.BMap.Map(this.$refs.mapContainer);
        map.centerAndZoom("中国", 5); // Set initial center and zoom level for China
  
        // Add zoom control
        map.addControl(new window.BMap.NavigationControl());
  
        // Search and mark each location on the map
        this.locations.forEach(location => {
          this.searchLocation(map, location);
        });
      },
      searchLocation(map, location) {
        const localSearch = new window.BMap.LocalSearch(map, {
          onSearchComplete: results => {
            if (localSearch.getStatus() === window.BMAP_STATUS_SUCCESS) {
              const marker = new window.BMap.Marker(results.getPoi(0).point);
              map.addOverlay(marker);
            }
          }
        });
  
        localSearch.search(location);
      },
    },
  };
  </script>
  
  <style scoped>
  .baidu-map {
    width: 100%;
    height: 80%;
  }
  </style>

 -->
