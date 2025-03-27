// 购物车功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有商品项
    const cartItems = document.querySelectorAll('.cart-item');
    
    // 为每个商品项添加事件监听
    cartItems.forEach(item => {
        const quantityInput = item.querySelector('.quantity-input');
        const decreaseBtn = item.querySelector('.quantity-btn:first-child');
        const increaseBtn = item.querySelector('.quantity-btn:last-child');
        const removeBtn = item.querySelector('.remove-item');
        const priceElement = item.querySelector('.item-price');
        const basePrice = parseFloat(priceElement.textContent.replace('¥', ''));
        
        // 减少数量
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateItemPrice(item, basePrice, currentValue - 1);
                updateOrderSummary();
            }
        });
        
        // 增加数量
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            updateItemPrice(item, basePrice, currentValue + 1);
            updateOrderSummary();
        });
        
        // 直接输入数量
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) {
                value = 1;
                this.value = 1;
            }
            updateItemPrice(item, basePrice, value);
            updateOrderSummary();
        });
        
        // 删除商品
        removeBtn.addEventListener('click', function() {
            item.remove();
            updateOrderSummary();
        });
    });

    // 结算按钮点击事件
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                alert('购物车是空的，请先添加商品！');
                return;
            }
            window.location.href = 'payment.html';
        });
    }
});

// 更新单个商品价格
function updateItemPrice(item, basePrice, quantity) {
    const priceElement = item.querySelector('.item-price');
    const totalPrice = basePrice * quantity;
    priceElement.textContent = `¥${totalPrice.toFixed(2)}`;
}

// 更新订单摘要
function updateOrderSummary() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    // 计算商品总额
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const basePrice = parseFloat(item.querySelector('.item-price').textContent.replace('¥', ''));
        subtotal += basePrice * quantity;
    });
    
    // 计算运费（示例：订单满1000免运费，否则运费20）
    const shipping = subtotal >= 1000 ? 0 : 20;
    
    // 计算总计
    const total = subtotal + shipping;
    
    // 更新订单摘要显示
    updateSummaryDisplay(subtotal, shipping, total);
    
    // 如果购物车为空，显示提示信息
    if (cartItems.length === 0) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '<div class="empty-cart">购物车是空的</div>';
    }
}

// 更新订单摘要显示
function updateSummaryDisplay(subtotal, shipping, total) {
    // 更新商品总额
    const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `¥${subtotal.toFixed(2)}`;
    }
    
    // 更新运费
    const shippingElement = document.querySelector('.summary-item:nth-child(2) span:last-child');
    if (shippingElement) {
        shippingElement.textContent = `¥${shipping.toFixed(2)}`;
    }
    
    // 更新总计
    const totalElement = document.querySelector('.summary-item.total span:last-child');
    if (totalElement) {
        totalElement.textContent = `¥${total.toFixed(2)}`;
    }
    
    // 更新免运费提示
    const shippingInfo = document.querySelector('.shipping-info');
    if (!shippingInfo) {
        const shippingItem = document.querySelector('.summary-item:nth-child(2)');
        const info = document.createElement('div');
        info.className = 'shipping-info';
        shippingItem.appendChild(info);
    }
    
    const shippingInfoElement = document.querySelector('.shipping-info');
    if (shippingInfoElement) {
        if (shipping === 0) {
            shippingInfoElement.textContent = '已免运费';
            shippingInfoElement.style.color = '#34c759';
        } else {
            shippingInfoElement.textContent = `再买${(1000 - subtotal).toFixed(2)}元可免运费`;
            shippingInfoElement.style.color = '#ff9500';
        }
    }
} 