# Development

### Link to Deployed Website
If you used the stencil code, this is `https://jumpylemur431.github.io/development/`

### Goal and Value of the Application
This application allows users to buy albums by GOT7, a South Korean K-pop group. The goal is to allow users to browse all released albums by the group and buy them. The value of the website is to allow users or GOT7 fans to have a one-stop shop to buy all the albums or EPs they would like, with detailed sorting and filtering on each item. 

### Usability Principles Considered
I included multiple types of sorts and filters that would be of most interest to the users bases on the website. For general users who would like to browse albums, there are sorts for the price and popularity of the albums, pulled from the order of popularity from Apple's iTunes. For more serious K-pop or GOT7 fans, they can learn further details on the album such as the lead single producer through the filter and the number of songs that make up each album or EP. All of these details can be filtered by the user. Finally, multiple albums can be added to the cart to then checkout. Cart items can be increased or decreased as well for any last minute changes. The filters lie on the left of the page with the cart on the right to view all major components of the page at once. 

### Organization of Components

There are two components in this React app:

**AlbumItem** is the component for each album/EP card displayed on the page. It includes information about each item such as name, description, price, type, and lead single producer. There is also a button "Add to cart" to add each individual item to the cart for checkout. 

**CartItem** is the component for all the items in the cart. This is trigged once an item is added to the cart. The component includes the name of the added item, a counter for the current number of items of the same type in the cart, and two buttons to increase and decrease the count in the cart. 

### How Data is Passed Down Through Components

All data originates from a JSON file that was created. The JSON includes the information about each of the 18 items which includes id, name, description, type, popularity, year, price, single_producer, and image url. In AlbumItem, important information is located on each individual card. There is also a button for adding the item to the cart in the form of a function updateCart.

For the CartItems, they are also recieving the same information from the JSON file and includes the title, and the count of each item within the cart. There is also another two functions for increasing and decreasing the count: incrementItem and decrementItem. 

### How the User Triggers State Changes

**Sorting**

For sorting, there is a state called sortBy and sortedMusicInfo. sortedMusicInfo is the state to keep the newly sorted set of cards depending on the sorting type selected by the user with the radio buttons on the page. Through the filterChanger function, all cards are sorted with the .sort function. The sorting differs if it is being sorted on price and popularity which are not strings but integers versus the other sorts. sortBy is the state to keep track of which sort type is selected by the user. The sortedMusicInfo is what all the items and their information are pulled from to be presented to the user on the screen. 

**Filters**

For each filter type, there are states to check if a filter is selected: is6EP, is7EP, is8EP, is10EP, isAlbum, isRepackagedAlbum in one dictionary and isJYP, isJinli, isEarattack, isDefsoul in another dictionary to sparate the two filters. These are called to update the states of the checked filters. This then triggers the album/EP cards to be displayed that fit the filters that are checked. All filters are initially checked when the user first access the page to get more specific filter results.

**Cart**

For the cart, there is a cart state a dictionary to hold the state of the cart, including what items and how many of each item are included in the cart. In the updateCart function for each item card, the cart items are updated to include the item name and its count. The cart is also updated if the user clicks on the plus or minus buttons. 

**Total**

For the total, there is a total state an integer to hold the total of the items in the cart. When the same "Add to cart" button is clicked by the user, the total is similarily updated with the updateCart function. This is the same for the plus and minus buttons with their own functions, incrementItem or decrementItem where the total is updated as necessary. This keeps track of the aggregate for the React app. 

**Reset and Clear**
For reseting the items in the cart and resetting the filters, there are two functions that are connected to two buttons. The resetFilters function triggers the filters to reset to the original settings where it is sorted by Year Released and with all the filters checked. The clearCart function will clear the cart of the current items and clear the total. 
