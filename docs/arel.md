---
title: Arel
categories:
  - Rails
contributors:
  - BAI
---

### 表(Table)

```rb
users = Arel::Table.new(:users)
users = User.arel_table  # ActiveRecord model
```

### 字段(Field)

```rb
users[:name]
users[:id]
```

### `where`

```rb
users.where(users[:name].eq('amy'))
# SELECT * FROM users WHERE users.name = 'amy'
```

### `select` (project)

```rb
users.project(users[:id])
# SELECT users.id FROM users
```

### `join`

#### 基本 join

在 ActiveRecord (非 Arel) 中, 如果 `:photos` 是关系的名字的话，使用 `joins`

```rb
users.joins(:photos)
```

在 Arel 中, 需要将 `photos` 定义为 Arel 表

```rb
photos = Photo.arel_table
users.join(photos)
users.join(photos, Arel::Nodes::OuterJoin).on(users[:id].eq(photos[:user_id]))
```

#### 条件 Join

```rb
users.joins(:photos).merge(Photo.where(published: true))
```

复杂些可以结合更多的 SQL 语句

```rb
users.join(
   users.join(photos, Arel::Nodes::OuterJoin)
   .on(photos[:user_id].eq(users[:id]).and(photos[:published].eq(true)))
)
```

#### 高级 Join

多个 `joins` 对同一张表但是表示不同的含义

```rb
creators = User.arel_table.alias('creators')
updaters = User.arel_table.alias('updaters')
photos = Photo.arel_table

photos_with_credits = photos
.join(photos.join(creators, Arel::Nodes::OuterJoin).on(photos[:created_by_id].eq(creators[:id])))
.join(photos.join(updaters, Arel::Nodes::OuterJoin).on(photos[:assigned_id].eq(updaters[:id])))
.project(photos[:name], photos[:created_at], creators[:name].as('creator'), updaters[:name].as('editor'))

photos_with_credits.to_sql
# => "SELECT `photos`.`name`, `photos`.`created_at`, `creators`.`name` AS creator, `updaters`.`name` AS editor FROM `photos` INNER JOIN (SELECT FROM `photos` LEFT OUTER JOIN `users` `creators` ON `photos`.`created_by_id` = `creators`.`id`) INNER JOIN (SELECT FROM `photos` LEFT OUTER JOIN `users` `updaters` ON `photos`.`updated_by_id` = `updaters`.`id`)"

# after the request is done, you can use the attributes you named
# it's as if every Photo record you got has "creator" and "editor" fields, containing creator name and editor name
photos_with_credits.map{|x|
  "#{photo.name} - copyright #{photo.created_at.year} #{photo.creator}, edited by #{photo.editor}"
}.join('; ')
```

### `limit` / `offset`

```rb
users.take(5) # => SELECT * FROM users LIMIT 5
users.skip(4) # => SELECT * FROM users OFFSET 4
```

### Aggregates

```rb
users.project(users[:age].sum) # .average .minimum .maximum
users.project(users[:id].count)
users.project(users[:id].count.as('user_count'))
```

### `order`

```rb
users.order(users[:name])
users.order(users[:name], users[:age].desc)
users.reorder(users[:age])
```

### 和 ActiveRecord

```rb
User.arel_table
User.where(id: 1).arel
```

### 用 Arel 清理代码

```rb
photos_with_credits = Photo.with_creator.with_editor
```

```rb
all_time      = photos_with_credits.count
this_month    = photos_with_credits.where(photos[:created_at].gteq(Date.today.beginning_of_month))
recent_photos = photos_with_credits.where(photos[:created_at].gteq(Date.today.beginning_of_month)).limit(5)
```

## 参考资料

- <http://github.com/rails/arel>
