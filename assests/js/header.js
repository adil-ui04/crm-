let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent

    let arrowParent = e.target.parentElement.parentElement; // Selecting main parent of arrow
    arrowParent.classList.toggle("showMenu"); // Toggle sub-menu visibility
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");

// Ensure the sidebar is open by default
sidebar.classList.remove("close_item");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close_item");

  // Toggle 'close_item' class on iframe container as well when sidebar button is clicked
  let iframeContainer = document.querySelector(".page_container");
  iframeContainer.classList.toggle("close_item");
});

// for active class on menu
$(document).ready(function () {
  $(".nav-links li").click(function () {
    $(".nav-links li").removeClass("active");

    $(this).addClass("active");
  });
});

// for active class on menu

// for mobile responsive

$(".bx-menu").click(function () {
  if ($(window).width() <= 992) {
    if ($(".sidebar").hasClass("close_item")) {
      $(".sidebar").removeClass("close_item").toggleClass("mobile_nav");
    }
  }
});

$(".nav-links li").click(function () {
  if ($(window).width() <= 992) {
    $(".sidebar").removeClass("mobile_nav");
    $(".page_container ").removeClass("close_item");
  }
});

// for mobile responsive

// for hiding menu

$(".dropdown_menu").click(function () {
  $(this).addClass("showMenu").siblings().removeClass("showMenu");
});

$(".dropdown_menu").click(function (event) {
  var $currentDropdown = $(this);
  var $subMenu = $currentDropdown.find(".sub-menu");

  // Clicked item is inside submenu
  var $clickedItem = $(event.target).closest("li");

  // Handle clicking on a main dropdown item (not a submenu item)
  if ($clickedItem.closest(".sub-menu").length === 0) {
    // If another main dropdown menu is clicked, deactivate previous active submenu item
    $(".dropdown_menu")
      .not($currentDropdown)
      .each(function () {
        // Deactivate submenu items for all other main menus
        $(this).find(".sub-menu li").removeClass("active_nav1");
      });

    // Always activate the second submenu item for the current dropdown menu
    $subMenu.find("li").removeClass("active_nav1");
    $subMenu.find("li:nth-child(2)").addClass("active_nav1");
  }
  // Handle clicking on a submenu item inside the current dropdown
  else {
    // If submenu item is clicked, activate it and deactivate the others
    $subMenu.find("li").removeClass("active_nav1");
    $clickedItem.addClass("active_nav1");
  }

  // Optionally, remove 'active_nav' from sibling links of other sub-menu_icons
  $currentDropdown
    .find(".sub-menu_icons")
    .siblings(".sub-menu_icons")
    .find("a")
    .removeClass("active_nav");
});

//*** search navbar filter ****
$(document).ready(function () {
  $("#nav-search").on("keyup input", function () {
    var value = $(this).val().toLowerCase();
    var hasMatch = false;

    $(".sidebar .nav-links li a").each(function () {
      var rowText = $(this).text().toLowerCase();
      if (rowText.indexOf(value) > -1) {
        $(this).show();
        hasMatch = true;
      } else {
        $(this).hide();
      }
    });

    $("#no-data-found").remove();
    if (!hasMatch) {
      $(".sidebar .nav-links").append(
        '<li id="no-data-found"><a>No Data Found</a></li>'
      );
    }
  });

  $("#nav-search").on("search", function () {
    if (!this.value) {
      $(".sidebar .nav-links li ").show();
      $("#no-data-found").remove();
    }
  });

  //**for hide***
  $("#ham-search").click(function () {
    if ($(window).width() > 992) {
      $(".--nav_search").toggle();
    }
  });
});
