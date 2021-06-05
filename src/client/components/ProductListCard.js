import React from 'react';
import { Link } from 'react-router-dom';
import metaRoutes from 'client/meta_routes';
import { Button } from 'reactstrap';
import { getSellingPrice, isWishlist, toggleWishlist } from 'client/util/product';
import { connect } from 'react-redux';
import { getHash } from 'config/url';
import { getValue } from 'client/util';

const ProductListCard = props => {
  const product = props.product;
  const sellingPrice = getSellingPrice(product);
  const isWishlistProduct = isWishlist(props.wishlists, product.id);
  const addRemoveWishlist = () => {
    toggleWishlist(props, { ...product, isWishlistProduct });
  };
  return (
    <div className="product-list product-item">
      {product.isOnDiscount && <span className="on-sale">Sale</span>}
      <div className="product-list-item">
        <div className="product-img">
          <Link to={metaRoutes.productView + '?i=' + getHash(product.id)}>
            <img src={product.product_images[0].imagePath}></img>
          </Link>
        </div>
        <div className="product-desc">
          <Link>
            <span className="product-cat">{getValue(props.categories, product.productCategoryId)}</span>
          </Link>
          <Link>
            <h3 className="product-name">{product.name}</h3>
          </Link>
          <span className="price">
            <span className="discount-price pr-2">
              {' '}
              {props.currency}
              {sellingPrice}
            </span>
            {product.isOnDiscount && (
              <del>
                <span className="real-price">
                  {' '}
                  {props.currency}
                  {product.markedPrice}
                </span>
              </del>
            )}
          </span>
          {isWishlistProduct ? (
            <div className="product-btn wishlist-btn">
              <Button color="link" onClick={addRemoveWishlist}>
                <i className="far fa-heart pr-2" style={{ fontWeight: 600 }}></i>
                Remove from Wishlist
              </Button>
            </div>
          ) : (
            <div className="product-btn wishlist-btn">
              <Button color="link" onClick={addRemoveWishlist}>
                <i className="far fa-heart pr-2"></i>Add to Wishlist
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default connect(state => ({
  currency: state.currency,
  wishlists: state.wishlists,
  categories: state.categories,
}))(ProductListCard);
