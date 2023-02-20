import React, { memo } from "react"

export const ProductsViewThead = memo(() => {
    return (
        <thead>
            <tr>
                <th>#</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
            </tr>
        </thead>
    )
})