export default function displayCartItem(props) {
    return (
        <div class="cart-box">
            <h3 class="cart-name">{props.name}</h3>
            <div class="cart-count"> 
                <button class="cart-button" onClick={() => props.decrementItem(props.name)}>-</button>
                <div class="count-text">{props.count}</div>
                <button class="cart-button" onClick={() => props.incrementItem(props.name)}>+</button>
            </div>
        </div>
    );
}