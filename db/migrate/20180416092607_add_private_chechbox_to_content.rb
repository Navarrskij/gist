class AddPrivateChechboxToContent < ActiveRecord::Migration[5.1]
  def change
    add_column :contents, :is_secret, :boolean, null: false, default: false
  end
end
