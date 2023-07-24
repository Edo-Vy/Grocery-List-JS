/**
 * Yêu cầu:
        • Xây dựng trang Grocery List có các chức năng
        • Tạo form cho phép thêm danh mục mua sắm
        • Xây dựng chức năng cho phép xoá 1 mục mua sắm
        • Xây dựng chức năng cho phép xoá toàn bộ danh mục
        • Xây dựng chức năng chỉnh sửa
        • Xây dựng các thông báo khi thêm, xoá, sửa danh mục
 */

var arrItem = [];

function renderItem(arrItem) {
    var htmlContent = "";
    for (var index = 0; index < arrItem.length; index++) {
        var item = arrItem[index];
        var html = `<div class="card__item">
                    <p class="card__item-title">${item.item}</p>
                    <div class="card__button">
                    <button class="btn btn-edit" onclick ="editItem('${item.item}')" ><i class="fas fa-edit"></i></button>
                    <button class="btn btn-delete" onclick ="xoaItem('${item.item}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
      `;
        htmlContent += html;
    }

    document.querySelector('.card__list').innerHTML = htmlContent;
}

/**===== Lưu vào Local Storage */

function luuLocalStorage(key, value) {

    localStorage.setItem(key, value);

}

/**====== Lấy thông tin từ LocalStorage */

function layLocalStorage(key) {

    // Kiểm tra localStorage có key đó không
    if (localStorage.getItem(key)) {

        return localStorage.getItem(key);
    }
    return undefined;
}
// Định nghĩa khi trang load xong html

window.onload = function () {

    var value = layLocalStorage('arrItem');
    if (value !== undefined) {
        // Biến đổi value thành mảng lại
        arrItem = JSON.parse(value);
        // Gọi hàm từ mảng để tạo ra list
        renderItem(arrItem);
    }
};

/* =========== Thêm Item ==============*/
document.querySelector('.btnSubmit').onclick = function () {

    var list = new Item();
    list.item = document.querySelector('.text__grocery').value;
    // console.log(list);

    arrItem.push(list);
    // Sau khi thêm vào mảng => {[],[]}
    renderItem(arrItem);
    // Sau khi thêm thành công => lưu arrItem vào localStorage
    var slItem = JSON.stringify(arrItem);
    luuLocalStorage("arrItem", slItem);

    var html = `<p> Đã Thêm Thành Công</p>`;
    document.querySelector('.alert').innerHTML = html;
}

/*=============== Xóa Item ================*/

function xoaItem(indexItem) {

    var viTriXoa = -1;
    for (var index = 0; index < arrItem.length; index++) {

        var lItem = arrItem[index];
        if (lItem.item == indexItem) {
            // Nếu obj list item trong mảng  === item được click thì lấy ra vị trí đó
            viTriXoa = index;
            break;

        }

    }
    arrItem.splice(viTriXoa, 1);
    // Say khi xóa tạo lại 1 list mới
    renderItem(arrItem);

    var html = `<p> Đã Xóa Thành Công</p>`;
    document.querySelector('.alert').innerHTML = html;
}

/**============= Chỉnh sửa Item ============= */

function editItem(indexItem) {

    for ( var index = 0; index < arrItem.length; index ++){

        var lItem = arrItem[index];
        if (indexItem == lItem.item){

            document.querySelector('.text__grocery').value = lItem.item;
            break;
        }
    }

}
