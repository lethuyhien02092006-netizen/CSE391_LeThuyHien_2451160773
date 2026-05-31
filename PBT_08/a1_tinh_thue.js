const MUC_THUE = 11_000_000;
const TY_LE_THUE = 0.1;

function tinhThueBaoHiemDeclaration(luong) {
    const thuong = luong > MUC_THUE ? luong * TY_LE_THUE : 0; // thuế (đề ghi thuong)
    return { thuong, thuc_nhan: luong - thuong };
}

const tinhThueBaoHiemExpression = function (luong) {
    const thuong = luong > MUC_THUE ? luong * TY_LE_THUE : 0;
    return { thuong, thuc_nhan: luong - thuong };
};

const tinhThueBaoHiemArrow = (luong) => {
    const thuong = luong > MUC_THUE ? luong * TY_LE_THUE : 0;
    return { thuong, thuc_nhan: luong - thuong };
};

module.exports = {
    tinhThueBaoHiemDeclaration,
    tinhThueBaoHiemExpression,
    tinhThueBaoHiemArrow,
};
