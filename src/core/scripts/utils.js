// 处理菜单
export function handleMenus(menus, result) {
  for (const item of menus) {
    if (item.leaf) result.push(item)
    else if (item.children) handleMenus(item.children, result)
  }
}
