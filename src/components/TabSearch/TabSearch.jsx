import PropTypes from "prop-types"


import "./TabSearch.scss";

function TabSearch({ onChange, tabs, activeTab, }) {
     return (
          <div className={("px-6")}>
               {tabs.map((tab, index) => (
                    <button
                         key={index}
                         className={`tab ${activeTab === index ? 'active' : ''}`}
                         onClick={() => {
                              onChange(index);
                         }}
                    >
                         {tab.label}
                    </button>
               ))}
          </div>
     );
}

TabSearch.propTypes = {
     tabs: PropTypes.arrayOf(
          PropTypes.shape({
               label: PropTypes.string.isRequired,
               // Define other properties of each tab object here
          }),
     ).isRequired,
     onChange: PropTypes.func.isRequired,
     activeTab: PropTypes.number.isRequired,

}

export default TabSearch;