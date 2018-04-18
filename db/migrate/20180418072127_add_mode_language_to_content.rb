class AddModeLanguageToContent < ActiveRecord::Migration[5.1]
  def change
    add_column :contents, :mode, :integer
  end
end
