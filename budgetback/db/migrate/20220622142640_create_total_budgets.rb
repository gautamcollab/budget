class CreateTotalBudgets < ActiveRecord::Migration[6.1]
  def change
    create_table :total_budgets do |t|
      t.integer :initialAmount

      t.timestamps
    end
  end
end
