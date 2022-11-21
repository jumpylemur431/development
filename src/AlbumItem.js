export default function displayAlbumItem(props) {
        const {name, description, type, price, image, single_producer} = props.item;

        return (
            <div class="box">
                <img class="img" src={image}></img>
                <h3>{name}</h3>
                <p><b>Description:</b> {description}</p>
                <p><b>Type: </b>{type}</p>
                <p><b>Lead Single Producer: </b>{single_producer}</p>
                <p><b>Price:</b> ${price}</p>
                <button class="add-button" onClick={() => props.updateCart(name)}>Add to cart</button>
            </div>
        );
}
