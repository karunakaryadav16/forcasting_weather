//weatherpage.jsx component


import styled from 'styled-components';

export const Parentcontainer = styled.div`
  color: white;
  min-height: 100vh;
  width: 100vw;
  background-color: #21D4FD;
  display: grid;
  grid-template-columns: 1fr; 

`;



export const  Overallcontainer = styled.div`
font-size: "Roboto";
display: grid;
grid-template-columns: 3fr 7fr;
margin: 0; /* Reset margin */
  padding: 0; 
  
`;



export const Imagecontainer = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: start;
`




export const Navbar = styled.div`
  width:100%;
  height: fit-content;
  background-color:darkgreen;

  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  grid-column: 1/-1;
  margin: 0; /* Reset margin */
  padding: 0; /* Reset padding */
  @media (max-width:480px){
    white-space: nowrap;
    display: flex;
    flex-direction: column;
   }
  

`;


export const Forecastcontainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,9,121,1) 1%, rgba(0,212,255,1) 100%);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-column: 2/-1;
  justify-items: center;


  @media ( min-width:788px )and( max-width: 1043px) {
  
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-column: 1/-1;
    justify-items: center;
    }

/* 
  @media  (min-width:480px) and ( max-width:785px ) {
  
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns:repeat(auto-fill, minmax(100px, 1fr)) ;
   
    grid-column: 1/-1;
    justify-items: center;
  } */

  @media (min-width: 480px) and (max-width: 785px) {
  height: 100%;
  width: 100%;
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
  display: flex;
  flex-wrap: wrap;
  grid-column: 1/-1;
  gap: 10px;
  justify-content: center;
}



  @media  (max-width:480px) {
  
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:1fr;
  grid-column: 1/-1;
  justify-items: center;
}


`;



 export const ForecastchildContainer = styled.div`

      display: flex;
      flex-direction: column;
      line-height: 3px;
      /* border: 1px solid ; */
      backdrop-filter: blur(10px);
      
      @media (max-width:780px) {
        /* display: flex;
        flex-direction:column; */
        column-gap: 4px;
        grid-column: 1/-1;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
-moz-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);

      }

`;

export const Spinner = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width:788px){
    
  }
`





export const Heading = styled.h2`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 4/-1;
        z-index: 1;
        border-radius: 10px;
        text-decoration: underline overline;

        @media (max-width: 480px) {
            grid-column: 1/-1;
            text-align: center;
            font-size: 16px;
          }
          
        @media (min-width: 480px) {
            grid-column: 1/-1;
            text-align: center;
          }



`;


export const Heading1 = styled.h1`
   /* font-size: 16px; */
   @media (max-width:480px){
    white-space: nowrap;
   }
  
`;










export  const Weatherinformation = styled.div`
     padding: 20px;
     display: flex;
     flex-direction: column;
     align-items: center;
    @media (min-width: 480px)  and (max-width:784px){
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      grid-column: 1/-1;
      text-align: center;
      column-gap: 20px;
  }
  @media (max-width: 480px){
      width: 100%;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      grid-column: 1/-1;
      text-align: center;
      column-gap: 20px;
  }

`


export const Input = styled.input`
  padding: 5px;
  border: none;
`

export const Buttonelemnt = styled.button`
   
   padding: 5px;
   border: none;

`



export const Image = styled.img`

height: 100px;
width: 100px;
`;



export const Button = styled.button`
  /* Button styles */
  &:hover {
    /* Styles for button on hover */
    background-color: lightblue;
  }
`;

