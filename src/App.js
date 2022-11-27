import "./App.css";
import { useState } from "react";
import got7Data from "./got7-album.json";
import AlbumItem from "./AlbumItem.js";
import CartItem from "./CartItem.js";
import logo from './got7_logo.png';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const got7Info = [];
got7Data.forEach((got7) => {
  got7Info.push({
        "name": got7.name,
        "price": got7.price,
        "popularity": got7.popularity,
        "year": got7.year,
        "company": got7.company, 
        "produced": got7.produced,
        "type": got7.type,
        "description": got7.description,
        "single_producer": got7.single_producer,
        "image": got7.image
      })
  });
  got7Info.sort((a,b) => (String(a.year)).localeCompare(String(b.year))); //initial sort by year

function App() {
  // Use useState to create a state variable to hold the state of the cart

  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const [is6EP, setIs6EP] = useState(true);
  const [is7EP, setIs7EP] = useState(true);
  const [is8EP, setIs8EP] = useState(true);
  const [is10EP, setIs10EP] = useState(true);
  const [isAlbum, setIsAlbum] = useState(true);
  const [isRepackagedAlbum, setIsRepackagedAlbum] = useState(true);
  const [isJYP, setIsJYP] = useState(true);
  const [isJinli, setIsJinli] = useState(true);
  const [isEarattack, setIsEarattack] = useState(true);
  const [isDefsoul, setIsDefsoul] = useState(true);
  const [sortedMusicInfo, setSortedMusicInfo] = useState(got7Info);
  const [sortBy, setSortBy] = useState('year');

  const check = {
    "6 Song EP": [is6EP, setIs6EP], //EP
    "7 Song EP": [is7EP, setIs7EP], //EP
    "8 Song EP": [is8EP, setIs8EP], //EP
    "10 Song EP": [is10EP, setIs10EP], //EP
    "Album": [isAlbum, setIsAlbum], //Album
    "Repackaged Album": [isRepackagedAlbum, setIsRepackagedAlbum], //Repackaged Album
  };

  const produce = {
    "JYP": [isJYP, setIsJYP], //JYP
    "earattack": [isEarattack,setIsEarattack], //earattack
    "Jinli": [isJinli, setIsJinli], //Jinli
    "Defsoul": [isDefsoul, setIsDefsoul], //Defsoul
  }

  /* Function 1: Update the Cart */ 
  const updateCart = (item) => {
    let newCart = cart;
    if (newCart[item] == undefined) {
      newCart[item] = 1
    } else {
      newCart[item] += 1
    }
    setCart(newCart);

    let itemPrice = null;
    for (const music of got7Info) {
      if (music.name == item) {
        itemPrice = music.price;
      }
    }
    setTotal(current => Math.round(100*(current + itemPrice))/100);
  }

  /* Function 2: Filter Updater */ 
  const filterChanger = (event, newValue) => {
    setSortBy(newValue);
    let toSort = [... sortedMusicInfo];
    let type = String(newValue);
    if (type=='popularity' || type=='price') { 
      toSort.sort(function(a, b) {
        return a[type] - b[type];
      });
    } 
    else {
      toSort.sort((a,b) => String(a[type]).localeCompare(String(b[type])));
    }
    setSortedMusicInfo(toSort);
    console.log(type);
    console.log(newValue);
    console.log(sortedMusicInfo);
  };

  /*Function 3: Increment items in cart */
  function incrementItem(name) {
    let newCart = cart;
    newCart[name] += 1
    setCart(newCart);

    let itemPrice = null;
    for (const music of got7Info) {
      if (music.name == name) {
        itemPrice = music.price;
      }
    }
    setTotal(current => Math.round(100*(current + itemPrice))/100);
  }

  /*Function 4: Decrement items in cart */
  function decrementItem(name) {
    let newCart = cart;
    if (newCart[name] > 0) {
      newCart[name] -= 1
      setCart(newCart);
  
      let itemPrice = null;
      for (const music of got7Info) {
        if (music.name == name) {
          itemPrice = music.price;
        }
      }

      setTotal(current => Math.round(100*(current - itemPrice))/100);
    }
  }

  /*Function 5: Cart clearing */
  function clearCart(name) {
    setCart([]);
    setTotal(0);
  }

  /*Function 6: Reset Filters */
  function resetFilters(name) {
    Object.keys(check).map(type => check[type][1](true));
    Object.keys(produce).map(producer => produce[producer][1](true));
    filterChanger(null, "year");
  }

  const radioTheme = {
    '&.Mui-checked': {color: "#4CAF50"}, marginLeft: "5px"};

  return (
    <div className="App">
      <div class="app-header"> 
       <img class="logo" src={logo}></img>
      </div>
      <h1>GOT7 Album Store</h1>
      <p class="subtext">Come and get it? GOT7! Welcome to the GOT7 Album store!</p> 
      <p class="subtext">Add albums or EPs to your cart and check out!</p>

      <div class="root">

      <div class="sorting">
          <div class="sort-title">
            <h3>Sort By:</h3>
          </div>
          <div class="sort-selects"> 
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="year"
              name="radio-buttons-group"
              onChange={filterChanger}
              value={sortBy}>
              <FormControlLabel sx={{color:"#1a1a1a"}} value='year' control={<Radio sx={radioTheme}/>} label="Year Released" />
              <FormControlLabel sx={{color:"#1a1a1a"}} value='name' control={<Radio sx={radioTheme} />} label="Name" />
              <FormControlLabel sx={{color:"#1a1a1a"}} value='price' control={<Radio sx={radioTheme}/>} label="Price" />
              <FormControlLabel sx={{color:"#1a1a1a"}} value='popularity' control={<Radio sx={radioTheme} />} label="Popularity" />
            </RadioGroup>
          </FormControl>
          </div>
          <div>
            <h3>Album Type Filter:</h3>
          </div>
          <div>
            <FormGroup>
              {Object.keys(check).map(type => 
              <FormControlLabel 
              onChange={(event, value) => 
                check[type][1](value)} 
              control={<Checkbox checked={check[type][0]} sx={{
                '&.Mui-checked': {
                  color: "#4CAF50"
                },
                marginLeft: "5px"
              }}/>} sx={{color: '#1a1a1a'}} label={type} />)}
            </FormGroup> 
          </div> 
          <div>
            <h3>Single Producer Filter:</h3>
          </div>
          <div>
            <FormGroup>
              {Object.keys(produce).map(single_producer => 
              <FormControlLabel 
              onChange={(event, value) => 
                produce[single_producer][1](value)} 
              control={<Checkbox checked={produce[single_producer][0]} sx={{
                '&.Mui-checked': {
                  color: "#4CAF50"
                },
                marginLeft: "5px"
              }}/>} sx={{color: '#1a1a1a'}} label={single_producer} />)}
            </FormGroup> 
          </div> 
          <button class="checkout-button" onClick={() => resetFilters()}>Reset Filters</button>
        </div>

        <div class="albums"> 
          {sortedMusicInfo.map(item => (check[item.type][0] && produce[item.single_producer][0])? 
            <AlbumItem item={item} updateCart={updateCart}></AlbumItem> : <></>
          )}
        </div>

        <div class="cart"> 
          <h2>Cart</h2>
          {Object.keys(cart).map(got7 => <CartItem name={got7} count={cart[got7]} incrementItem={incrementItem} decrementItem={decrementItem}></CartItem> )}
          <h3>Total: ${total}</h3>
          <button class="checkout-button">Checkout</button>
          <button class="checkout-button" onClick={() => clearCart()}>Clear Cart</button>
        </div>

      </div>
      <div class="footer">
        All images sourced from Apple Music Website. Big thanks to GOT7 for producing amazing music! 
      </div>
    </div>
  );
}

export default App;
