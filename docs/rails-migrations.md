---
title: Rails - Migration
categories:
  - Rails
contributors:
  - BAI
---

## Rails - Migration

### 自动创建迁移

```shell
rails generate migration RemovePartNumberFromProducts part_number:string
rails generate migration remove_part_number_from_products part_number

rails generate migration AddNameToWidgets name:string
rails g migration add_name_to_widgets name:string
```

### 执行迁移

```shell
rake db:migrate
```

### 创建表

```ruby
create_table :users do |t|
  t.string :name
  t.text   :description

  t.primary_key :id
  t.string      :title
  t.text        :description
  t.integer     :games_count
  t.float       :lol
  t.decimal     :price
  t.decimal     :price, :precision => 2, :scale => 10
  t.datetime    :expiration
  t.timestamp   :time_in
  t.time        :time_in
  t.date        :expiry
  t.binary      :image_data
  t.boolean     :is_admin
end

# Options:
  :null (boolean)
  :limit (integer)
  :default
```

### 具体操作

```ruby
add_column    :users, :first_name, :string
remove_column :users, :first_name, :string

change_column :users, :first_name, :text

change_column_default :users, :admin, nil
change_column_null    :users, :email, false # 添加不允许为空的约束

create_table
change_table
drop_table

add_column
change_column
rename_column
remove_column

add_index
remove_index
```

### 模型用法

```ruby
class AddFlagToProduct < ActiveRecord::Migration
  class Product < ActiveRecord::Base
  end

  def change
    add_column :products, :flag, :boolean
    Product.reset_column_information
    reversible do |dir|
      dir.up { Product.update_all flag: false }
    end
  end
end
```

### 关联（Association）

```ruby
  t.references :category   # 与 t.integer :category_id 等效
  t.references :category, polymorphic: true
```

### 自动增、减列

```ruby
rails generate migration RemovePartNumberFromProducts part_number:string
```

### 索引

```ruby
add_index :suppliers, :name

add_index :accounts, [:branch_id, :party_id], :unique => true

add_index :accounts, [:branch_id, :party_id], :unique => true, :name => "by_branch_party"

add_index :accounts, :name, :name => ‘by_name’, :length => 10
add_index :accounts, [:name, :surname], :name => ‘by_name_surname’,
  :length => {
    :name => 10,
    :surname => 15
  }

add_index :accounts, [:branch_id, :party_id, :surname],
  :order =>
```

### 在 Console 中

Use `ActiveRecord::Migration`.

```ruby
  ActiveRecord::Migration.add_index :posts, :slug
```

### 参考资料

- [http://apidock.com/rails/ActiveRecord/ConnectionAdapters/SchemaStatements/add_index](http://apidock.com/rails/ActiveRecord/ConnectionAdapters/SchemaStatements/add_index)
