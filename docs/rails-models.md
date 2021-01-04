---
title: Rails Model
categories:
  - Rails
contributors:
  - BAI
---

## 创建模型

### 创建

```ruby
  rails g model User
```

## 使用模型

### 查询方法

```ruby
items = Model
  .where(first_name: 'Harvey')
  .where('id = 3')
  .where('id = ?', 3)
```

```ruby
  .order(:title)
  .order(title: :desc)
  .order("title DESC")
```

```ruby
  .reorder(:title)  # discards other .order's
  .rewhere(...)     # discards other .where's
```

```ruby
  .limit(2)
  .offset(1)
  .uniq
```

详见: [QueryMethods](http://devdocs.io/rails/activerecord/querymethods)

### 进阶查询方法

```ruby
items = Model
  .select(:id)
  .select([:id, :name])
```

```ruby
  .group(:name)   # GROUP BY name
  .group('name AS grouped_name, age')
  .having('SUM(price) > 30')  # 需要再 .group 后执行 having
```

```ruby
  .includes(:user)
  .includes(user: [:articles])
```

```ruby
  .references(:posts)
  # 同: .where("posts.name = 'foo'").references(:posts)
```

### Find 方法

```ruby
item = Model.find(id)
item = Model.find_by_email(email)
item = Model.where(email: email).first
```

```ruby
Model
  .exists?(5)
  .exists?(name: "David")
```

```ruby
  .first
  .last
  .find_nth(4, [offset])
```

详见: [FinderMethods](http://devdocs.io/rails/activerecord/findermethods)

### 保存

```ruby
item.new_record?
item.persisted?
item.destroyed?

item.serialize_hash
```

```ruby
item.save
item.save!      # 功能同上，但抛出异常
```

```ruby
item.update  name: 'John'
item.update! name: 'John'
```

```ruby
item.update_column,  name: 'John'  # update_column 会跳过 validation 和 callbacks
item.update_columns  name: 'John'
item.update_columns! name: 'John'
```

```ruby
item.touch                 # 更新 :updated_at
item.touch :published_at
```

```ruby
item.destroy
item.delete  # 跳过 callback
```

```ruby
Model.create     # 等同于先 #new 再 #save
Model.create!    # 功能同上，但抛出异常
```

详见: [Persistence](http://devdocs.io/rails/activerecord/persistence)

### 属性赋值

```ruby
item.attributes                      # #<Hash>
```

```ruby
item.attributes = { name: 'John' }   # 合并 hash 中相应的值，但不保存
item.assign_attributes name: 'John'  # 同上
```

详见: [AttributeAssignment](http://devdocs.io/rails/activerecord/attributeassignment)

### Dirty

```ruby
item.changed?
item.changed             # ['name']
item.changed_attributes  # { 'name' => 'Bob' } - original values
item.changes             # { 'name' => ['Bob', 'Robert'] }
item.previous_changes    # #save 之后可调用
item.restore_attributes
```

```ruby
item.name = 'Robert'
item.name_was         # 'Bob'
item.name_change      # [ 'Bob', 'Robert' ]
item.name_changed?    # true
item.name_changed?(from: 'Bob', to: 'Robert')
```

详见: [Dirty](http://devdocs.io/rails/activemodel/dirty)

### 验证（Validation）

```ruby
item.valid?
item.invalid?
```

详见: [Validations](http://devdocs.io/rails/activerecord/validations)

### 计算

```ruby
Person.count
Person.count(:age)
```

```ruby
Person.average(:age)
Person.maximum(:age)
Person.minimum(:age)
Person.sum('2 * age')
```

```ruby
Person.calculate(:count, :all)
```

进阶用法:

```ruby
Person.distinct.count
Person.group(:city).count
```

详见: [Calculations](http://devdocs.io/rails/activerecord/calculations)

### 动态属性名称的 Find 方法

不太建议这么使用

```ruby
# 返回一条记录
Person.find_by_name(name)
Person.find_last_by_name(name)
Person.find_or_create_by_name(name)
Person.find_or_initialize_by_name(name)
```

```ruby
# 返回一组记录
Person.find_all_by_name(name)
```

```ruby
# 抛出异常
Person.find_by_name!(name)
```

```ruby
# 也可以用 `scoped` 代替 `find`
Person.scoped_by_user_name
```

## 关联（Association）

### 关联

- `belongs_to`
- `has_one`
- `has_many`
- `has_many :through`
- `has_one :through`
- `has_and_belongs_to_many`

### Has many

```ruby
belongs_to :parent, :foreign_key => 'parent_id' class_name: 'Folder'
has_many :folders, :foreign_key => 'parent_id', class_name: 'Folder'

has_many :comments,                -> { order('posted_on DESC') }
has_many :comments,    :include    => :author
has_many :people,      :class_name => "Person"
has_many :people,      :conditions => "deleted = 0"
has_many :tracks,                  -> { order(:position) }
has_many :comments,    :dependent  => :nullify
has_many :comments,    :dependent  => :destroy
has_many :tags,        :as         => :taggable
has_many :reports,     :readonly   => true
has_many :subscribers, :through    => :subscriptions, class_name: "User", :source => :user
has_many :subscribers, :finder_sql =>
    'SELECT DISTINCT people.* ' +
    'FROM people p, post_subscriptions ps ' +
    'WHERE ps.post_id = #{id} AND ps.person_id = p.id ' +
    'ORDER BY p.first_name'
```

### belongs to

```ruby
belongs_to :author,
  :dependent      => :destroy    # 或 :delete

  :class_name     => "Person"
  :select         => "*"
  :counter_cache  => true
  :counter_cache  => :custom_counter
  :include        => "Book"
  :readonly       => true

  :conditions     => 'published = true'

  :touch          => true
  :touch          => :authors_last_updated_at

  :primary_key    => "name"
  :foreign_key    => "author_name"
```

### Many-to-many

```ruby
class Programmer < ActiveRecord::Base
  has_many :assignments
  has_many :projects, :through => :assignments
end
```

```ruby
class Project < ActiveRecord::Base
  has_many :assignments
  has_many :programmers, :through => :assignments
end
```

```ruby
class Assignment
  belongs_to :project
  belongs_to :programmer
end
```

### Many-to-many (HABTM)

```ruby
has_and_belongs_to_many :projects
has_and_belongs_to_many :projects, :include => [ :milestones, :manager ]
has_and_belongs_to_many :nations, :class_name => "Country"
has_and_belongs_to_many :categories, :join_table => "prods_cats"
has_and_belongs_to_many :categories, :readonly => true
has_and_belongs_to_many :active_projects, :join_table => 'developers_projects', :delete_sql =>
"DELETE FROM developers_projects WHERE active=1 AND developer_id = #{id} AND project_id = #{record.id}"
```

### Polymorphic 关联

```ruby
class Post
  has_many :attachments, as: :parent
end
```

```ruby
class Image
  belongs_to :parent, polymorphic: true
end
```

```ruby
create_table :images do |t|
  t.references :post, polymorphic: true
end
```

## 验证（Validation）

### 验证

```ruby
class Person < ActiveRecord::Base
```

```ruby
  # 存在
  validates :name,     presence: true
```

```ruby
  # 是否接受
  validates :terms,    acceptance: true
```

```ruby
  # 确认
  validates :email,    confirmation: true
```

```ruby
  # 唯一
  validates :slug,     uniqueness: true
  validates :slug,     uniqueness: { case_sensitive: false }
  validates :holiday,  uniqueness: { scope: :year, message: 'yearly only' }
```

```ruby
  # 格式
  validates :code,     format: /regex/
  validates :code,     format: { with: /regex/ }
```

```ruby
  # 长度
  validates :name,     length: { minimum: 2 }
  validates :bio,      length: { maximum: 500 }
  validates :password, length: { in: => 6..20 }
  validates :number,   length: { is: => 6 }
```

```ruby
  # 是否包含
  validates :gender,   inclusion: %w(male female)
  validates :gender,   inclusion: { in: %w(male female) }
  validates :lol,      exclusion: %w(xyz)
```

```ruby
  # 数字
  validates :points,   numericality: true
  validates :played,   numericality: { only_integer: true }
  # ... greater_than, greater_than_or_equal_to,
  # ... less_than, less_than_or_equal_to
  # ... odd, even, equal_to
```

```ruby
  # 验证关系是否有效
  has_many :books
  validates_associated :books
```

```ruby
  # 长度
  validates :content, length: {
    minimum:   300,
    maximum:   400,
    tokenizer: lambda { |str| str.scan(/\w+/) },
    too_short: "must have at least %{count} words",
    too_long:  "must have at most %{count} words" }
```

```ruby
  # 多属性
  validates :login, :email, presence: true
```

```ruby
  # 条件
  validates :description, presence: true, if: :published?
  validates :description, presence: true, if: lambda { |obj| .. }
```

```ruby
  validates :title, presence: true, on: :save   # :save | :create | :update
```

```ruby
end
```

### 自定义验证

```ruby
class Person < ActiveRecord::Base
  validate :foo_cant_be_nil

  def foo_cant_be_nil
    errors.add(:foo, 'cant be nil')  if foo.nil?
  end
end
```

### 错误

```ruby
record.errors.valid?      # → false
record.errors             # → { :name => ["can't be blank"] }
record.errors.messages    # → { :name => ["can't be blank"] }
```

```ruby
record.errors[:name].any?
```

## 其他 API

### Callback

- [Guides: callbacks](http://guides.rubyonrails.org/active_record_validations_callbacks.html)

### 大量更新

```ruby
Person.update 15, name: "John", age: 24
Person.update [1,2], [{name: "John"}, {name: "foo"}]
```

### Join

```ruby
# 基础 Join
Student.joins(:schools).where(schools: { type: 'public' })
Student.joins(:schools).where('schools.type' => 'public' )
```

```ruby
# 多关系
Article.joins(:category, :comments)
```

```ruby
# 嵌套关系
Article.joins(comments: :guest)
```

```ruby
# SQL
Author.joins(
  'INNER JOIN posts ' +
  'ON posts.author_id = authors.id ' +
  'AND posts.published = "t"'
)
```

### Where 语句

```ruby
where('name = ?', 'John')
where(['name = :name', { name: 'John' }])
```

### 序列化

```ruby
class User < ActiveRecord::Base
  serialize :preferences
end
```

```ruby
user = User.create(
  preferences: {
    'background' => 'black',
    'display' => 'large'
  }
)
```

```ruby
# 只接收 Hash 参数
class User < ActiveRecord::Base
  serialize :preferences, Hash
end
```

```ruby
# 如果类型不匹配会抛出 SerializationTypeMismatch 异常
user = User.create(preferences: %w(one two three))
User.find(user.id).preferences
```

## 其他技巧

### 覆写存取器（accessor）

```ruby
class Song < ActiveRecord::Base
  def length=(minutes)
    write_attribute(:length, minutes.to_i * 60)
  end

  def length
    read_attribute(:length) / 60
  end
end
```

详见: <http://api.rubyonrails.org/classes/ActiveRecord/Base.html>

## Callback

- after_create
- after_initialize
- after_validation
- after_save
- after_commit
