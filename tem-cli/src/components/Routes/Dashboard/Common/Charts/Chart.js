import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['data'],
  mounted () {
    let myData = this.data.d;
    console.log(myData);
    
    this.renderChart({
      labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      datasets: [
        {
          label: 'تعداد فروش',
          backgroundColor: '#03fcb6',
          data: myData
        }
      ]
    });
  },
  watch: {
    data: function() {
      let myData = this.data.d;
      console.log(myData);
      
      this.renderChart({
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        datasets: [
          {
            label: 'تعداد فروش',
            backgroundColor: '#03fcb6',
            data: myData
          }
        ]
      });
    }
  },
};