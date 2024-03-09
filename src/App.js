
import './App.css';
import Item from './components/Item';
import ItemDate from './components/ItemDate';
import Card from './components/Card';

function App() {
  const response = [
    {
    Itemname:"Nirma",
    date:"20",
    Itemmonth:"July",
    Itemyear:"2024",
  },
  {
    Itemname:"Sarla",
    date:"20",
    Itemmonth:"July",
    Itemyear:"2024",
  },
  {
    Itemname:"Tarla",
    date:"23",
    Itemmonth:"July",
    Itemyear:"2024",
  }
  
];

  // this is another way to apply props
  const ItemTwoName ="Sarla";
  return ( <div>
    <Card>
    <ItemDate day="22" month="July" year="2028" ></ItemDate>
     <Item name= "Nirmala" >
      Hey it's children element!
      <p>let's check</p>
     </Item>
     <ItemDate day="20" month="June" year="2020" ></ItemDate>
     <Item name={ItemTwoName} ></Item>
     <ItemDate day={response[2].date} month={response[2].Itemmonth} year={response[2].Itemyear} ></ItemDate>
     <Item name= { response[2].Itemname}></Item>
    <div className="App">Hello Suhana!</div>
    </Card>
    </div>
  );
}

export default App;
