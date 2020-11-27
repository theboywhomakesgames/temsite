import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['data'],
  mounted () {
    let myData = []
    if(this.data){
      for(let i = 0; i < this.data.start; i++){
        myData.push(0);
      }
      
      for(let i = 0; i < this.data.d.length; i++){
        myData.push(this.data.d[i]);
      }

      while(myData.length < 12){
        myData.push(0);
      }
    }
    else{
      let myData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    
    this.renderChart({
      labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      datasets: [
        {
          label: 'تعداد فروش',
          backgroundColor: '#03fcb6',
          data: myData
        }
      ]
    })
  }
};