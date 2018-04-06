class ChangeTypeBodyInContent < ActiveRecord::Migration[5.1]
  def change
    remove_column :contents, :body
    add_column :contents, :body, :text
  end
end
