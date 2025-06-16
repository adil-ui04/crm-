// tab code
$(document).on("click", ".unitab", function () {
  $(".unitab").removeClass("active");
  $(".unitab-content").removeClass("active");

  $(this).addClass("active");
  $("#" + $(this).data("tab")).addClass("active");
});

// all forms scripts

// **VALIDATION FOR MULTI NO WITH COMMA**
$(document).ready(function () {
  $(document).on("input", ".num_validate", function () {
    let inputVal = $(this).val();
    let formattedVal = inputVal.replace(/[^0-9,]/g, "");
    formattedVal = formattedVal.replace(/,{2,}/g, ",");
    $(this).val(formattedVal);
  });

  $(document).on("blur", ".num_validate", function () {
    let inputVal = $(this).val();
    $(this).val(inputVal.replace(/^,|,$/g, ""));
  });
});
// END***

// **ADD REMOVE SELECT OPTION**
function updateButtons(section) {
  const $addedList = section.find(".t_added li");
  const $removedList = section.find(".t_removed li");
  const hasOptionsAdded = $addedList.length > 0;
  const hasSelectedAdded = section.find(".t_added li.selected").length > 0;
  const hasOptionsRemoved = $removedList.length > 0;
  const hasSelectedRemoved = section.find(".t_removed li.selected").length > 0;
  // Update Add button
  section
    .find(".btn_add")
    .toggleClass("enabled", hasSelectedAdded && hasOptionsAdded);
  // Update Remove button
  section
    .find(".btn_remove")
    .toggleClass("enabled", hasSelectedRemoved && hasOptionsRemoved);
}

function initializeDynamicElements() {
  $(".form_groups").each(function () {
    const section = $(this);
    // Remove previous event handlers to avoid duplicates
    section.off("click", ".btn_add, .btn_remove");
    section.find(".tag_list").off("click");
    // Add button click handler
    section.on("click", ".btn_add.enabled", function () {
      section
        .find(".t_added li.selected")
        .appendTo(section.find(".t_removed"))
        .removeClass("selected");
      updateButtons(section);
    });
    // Remove button click handler
    section.on("click", ".btn_remove.enabled", function () {
      section
        .find(".t_removed li.selected")
        .appendTo(section.find(".t_added"))
        .removeClass("selected");
      updateButtons(section);
    });
    // Click to select/deselect list items
    section.find(".tag_list").on("click", "li", function () {
      $(this).toggleClass("selected");
      updateButtons(section);
    });
    // Initial button update
    updateButtons(section);
  });
  // Deselect items when clicking outside
  $(document)
    .off("click.formGroups")
    .on("click.formGroups", function (e) {
      if (!$(e.target).closest(".form_groups").length) {
        $(".form_groups").each(function () {
          $(this).find(".tag_list li").removeClass("selected");
          updateButtons($(this));
        });
      }
    });
}
// Initialize the functionality
$(document).ready(function () {
  initializeDynamicElements();
});
// END***
