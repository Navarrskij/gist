class AddNumberGistStringToComment < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :gist_row, :integer
  end
end
